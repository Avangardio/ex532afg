interface AddLink {
  addLink(data: AddLinkBody): Promise<string | null>;
}

interface RemoveLink {

}

interface GetOneLink {

}

interface GetAllLink {

}

type AddLinkBody = {
  name: string,
  url: string,
  userId: number,
}
