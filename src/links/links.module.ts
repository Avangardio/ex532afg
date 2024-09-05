import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { TypeCQLModule } from 'typecql';
import { LinksEntity } from './entities/links.entity';
import { AddLinkScene } from './scenes/addLink.scene';
import { DeleteLinkScene } from './scenes/deleteLink.scene';
import { GetLinkScene } from './scenes/getLink.scene';
import { GetLinksUpdates } from './updates/getLinks.updates';
import { LinksUpdates } from './updates/links.updates';

@Module({
  imports: [TypeCQLModule.forFeature([LinksEntity])],
  providers: [
    LinksService,
    AddLinkScene,
    DeleteLinkScene,
    GetLinkScene,
    GetLinksUpdates,
    LinksUpdates,
  ],
})
export class LinksModule {}
