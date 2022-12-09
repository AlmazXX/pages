export interface Page {
  title: string;
  content: string;
}

export interface PagesList {
  [key: string]: Page;
}