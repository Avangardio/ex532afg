import { Injectable } from '@nestjs/common';
import { isValidURL } from '../misc/helpers/isValidURL';
import { UserFaultException } from '../misc/exceptions/userFault.exception';
import { BaseRepository, InjectRepository } from 'typecql';
import { LinksEntity } from './entities/links.entity';
import {
  AddLink,
  AddLinkBody,
  DeleteLink,
  GetAllLinks,
  GetLinksBody,
  GetOneLink,
  TableWithCount,
} from './types/links.service.types';
import { TABLE_LIMIT } from './links.templates';
import { isUUID } from '../misc/helpers/isValidUUID';

export interface ILinksService
  extends AddLink,
    GetAllLinks,
    DeleteLink,
    GetOneLink {}

@Injectable()
export class LinksService implements ILinksService {
  constructor(
    @InjectRepository(LinksEntity)
    readonly linksRepository: BaseRepository<LinksEntity>,
  ) {}

  async addLink(data: AddLinkBody): Promise<string> {
    const { url, name, userId } = data;
    if (!isValidURL(url)) {
      throw new UserFaultException('❌ Введена неправильная ссылка!');
    }
    const linkId = crypto.randomUUID();
    await this.linksRepository.insert({
      url,
      id: linkId,
      userId,
      urlName: name,
    });
    return linkId;
  }

  async getLinks(data: GetLinksBody): Promise<TableWithCount> {
    const { userId, page } = data;
    const linksWithCount = await this.linksRepository.findAndCount({
      where: { userId },
      limit: TABLE_LIMIT,
      page,
      allowFiltering: true,
    });
    let table = '\n<b>Ссылка</b> - <b>Код</b>\n';
    for (const row of linksWithCount.rows) {
      const { id, urlName, url } = row;
      table += `${url} - <b>${id}</b>\n`;
    }
    table += '\n';
    return {
      table,
      count: linksWithCount.count,
    };
  }

  async deleteLink(url: string, userId: number): Promise<boolean> {
    if (!isValidURL(url)) {
      throw new UserFaultException('❌ Введена неправильная ссылка!');
    }
    const searchForDelete = await this.linksRepository.findOne({
      where: { url: url, userId },
      allowFiltering: true,
    });
    if (searchForDelete === null) {
      return false;
    }
    await this.linksRepository.delete({
      where: {
        url,
        userId,
      },
    });
    return true;
  }

  async getLink(code: string): Promise<string> {
    if (!isUUID(code)) {
      throw new UserFaultException(
        '❌ Введен неправильный код. Попробуйте другой код!',
      );
    }
    const searchResult = await this.linksRepository.findOne({
      select: [{ field: 'url', alias: 'code' }],
      where: { id: code },
      allowFiltering: true,
    });
    if (searchResult === null) {
      throw new UserFaultException(
        '❌ По данному коду ссылки не существует. Попробуйте другой код!',
      );
    }
    return searchResult.code;
  }
}
