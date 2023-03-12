import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { StringFilter } from "../types";

export type StateValue<Data> = { value?: Data, setValue: (v: Data) => any, onClear: () => void }

export function StringFilterForm(
  {
    value = { name: 'str', search: '', notInclude: '' },
    setValue,
    onClear
  }: StateValue<StringFilter>
) {
  const [notInclude, setNotInclude] = useState<string>(value.notInclude);
  const [search, setSearch] = useState<string>(value.search);
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setValue({ name: 'str', search, notInclude })
    }}>
      <div style={{ display: 'flex', gap: 10, flexFlow: 'column' }}>
        <TextField label="Искать" value={search} onChange={(e) => setSearch(e.target.value)} />
        <TextField label="Исключить" value={notInclude} onChange={(e) => setNotInclude(e.target.value)} />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button size="small" type="submit">Применить</Button>
          <Button size="small" type="button" onClick={onClear}>Очистить</Button>
        </div>
      </div>
    </form>
  );
}
