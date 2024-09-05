import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { LinksModule } from './links/links.module';
import { session } from 'telegraf';
import { TypeCQLModule } from 'typecql';
import * as process from 'node:process';

@Module({
  imports: [
    LinksModule,
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN,
      middlewares: [session()],
    }),
    TypeCQLModule.forRoot({
      contactPoints: [
        process.env.DB_CP,
      ],
      autoCreateTables: true,
      autoCreateColumns: true,
      camelCaseEnabled: true,
      localDataCenter: 'datacenter1',
      keyspace: process.env.DB_KS,
      credentials: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
