import { IItem } from './Items';
import { ICategory, IInputField } from './ManageCategory';

export interface ICardCategory {
  removeCategory?: any;
  data: ICategory;
  index: number;
}

export interface ICardItem {
  data: IItem;
  title: string;
  inputs: Array<IInputField>;
  onRemoveItem(id: String): void;
  onUpdateItem(data: string | boolean | Date, field: string): void;
}

export interface ICardItemSection {
  id: string;
  name: string;
}
