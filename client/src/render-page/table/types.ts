import { Input, InputForm } from "../form/types";

export type BaseColumn<Data = any> = {
  key: keyof Data,
  title: string,
  width?: number | string,
};

export type JustColumn<Data = any> = BaseColumn<Data> & {
  type: 'num'
      | 'str'
      | 'link'
      | 'key'
      | 'img'
      | 'file'
};

export type DateColumn<Data = any> = BaseColumn<Data> & {
  type: 'date',
  format: string,
};

export type EnumColumn<Data = any> = BaseColumn<Data> & {
  type: 'enum',
  values: string[],
};

export type InputColumn<Data = any> = (
  BaseColumn<Data> 
  & Omit<InputForm, (keyof Input)>
  & { onChange: string }
);

export type Column<Data = any> = JustColumn<Data> | DateColumn<Data> | EnumColumn<Data> | InputColumn<Data>;