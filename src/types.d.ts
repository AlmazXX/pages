export interface IPost {
  id: string;
  title: string;
  date: string;
  body: string;
}

export type IPostApi = Omit<IPost, 'id'>

export interface IPostsList {
  [id: string]: IPostApi;
}

export interface Page {
  title: string;
  content: string;
}

export interface PagesList {
  [key: string]: Page;
}