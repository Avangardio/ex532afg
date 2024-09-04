import { Injectable } from '@nestjs/common';
import { isValidURL } from '../misc/helpers/isValidURL';

@Injectable()
export class LinksService implements AddLink {
  async addLink(data: AddLinkBody): Promise<string | null>  {
    const {url, name, userId} = data;
     if (!isValidURL(url)) {
       return null;
     }
    const linkId = crypto.randomUUID();
    // Сохранение в БД будет здесь
    return linkId;
  }

}
