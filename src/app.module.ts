import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { LinksModule } from './links/links.module';
import { session } from 'telegraf';

@Module({
  imports: [
    LinksModule,
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN,
      middlewares: [session()]
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
