export interface AddLink {
  addLink(data: AddLinkBody): Promise<string>;
}

export interface DeleteLink {
  deleteLink(url: string, userId: number): Promise<boolean>;
}

export interface GetOneLink {
  getLink(code: string): Promise<string>;
}

export interface GetAllLinks {
  getLinks(data: GetLinksBody): Promise<TableWithCount>;
}

export type AddLinkBody = {
  name: string;
  url: string;
  userId: number;
}

export type GetLinksBody = {
  userId: number;
  page: number;
}

export type TableWithCount = {
  count: number;
  table: string;
}
