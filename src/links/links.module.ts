import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { AddLinksScene } from './scenes/linkAdd.scene';

@Module({
  imports: [],
  providers: [LinksController, LinksService, AddLinksScene],
})
export class LinksModule {}
