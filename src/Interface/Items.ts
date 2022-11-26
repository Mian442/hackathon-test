export interface IItem {
  parentCategoryId: string;
  id: string;
  [key: string]: string;
}

export interface IItems {
  [key: string]: Array<IItem>;
}
