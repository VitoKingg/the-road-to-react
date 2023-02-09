export interface ListContentType {
  title: string;
  url: string;
  author: string;
  numComments: number;
  points: number;
  objectID: number;
}

export type ListContentsType = ListContentType[];

export interface GetListsType {
  data: ListContentsType;
}
