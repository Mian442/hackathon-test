import { TInputFieldType } from '../Types/ManageCategory';

export interface IInputField {
  type: TInputFieldType;
  value: string;
  id: string;
}

export interface ICategory {
  name: string;
  titleSelected: number;
  inputFields: Array<IInputField>;
  id: string;
}
