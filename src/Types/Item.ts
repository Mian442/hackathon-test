import { IItem, IItems } from '../Interface/Items';

export type ItemState = { items: IItems };

export type TUpdateItem = (
  index: number,
  field: string,
  data: string | boolean | Date
) => void;

export type TRenderTitle = (type: string, value: string, item: IItem) => string;
