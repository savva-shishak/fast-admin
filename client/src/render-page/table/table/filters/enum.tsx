import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useState } from "react";
import { EnumFilter } from "../types";

export type StateValue<Data> = { value?: Data, setValue: (v: Data) => any, onClear: () => void }

export function EnumFilterForm(
  {
    value = {
      name: 'enum',
      filter: [],
      values: ['item 1', 'item 2'],
    },
    setValue,
    onClear
  }: StateValue<EnumFilter>
) {
  const [filter, setFilter] = useState(value.filter || []);
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setValue({ ...value, filter })
    }}>
      <div style={{ display: 'flex', gap: 10, flexFlow: 'column' }}>

        <FormControl>
          <InputLabel>
            Выберите допустимые значения:
          </InputLabel>
          <Select
            style={{ width: '100%' }}
            multiple
            value={filter}
            onChange={({ target }) => {
              console.log(target.value);
              
              setFilter(typeof target.value === 'string' ? target.value.split(',') : target.value as any);
            }}
          >
            {value.values?.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button type="submit">Применить</Button>
          <Button type="button" onClick={onClear}>Очистить</Button>
        </div>
      </div>
    </form>
  );
}