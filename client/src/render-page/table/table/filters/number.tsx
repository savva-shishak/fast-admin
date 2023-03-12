import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { NumberFilter } from "../types";

export type StateValue<Data> = { value?: Data, setValue: (v: Data) => any, onClear: () => void }

export function NumberFilterForm(
  {
    value = { name: 'num', from: 0, to: 0 },
    setValue,
    onClear
  }: StateValue<NumberFilter>
) {
  const [from, setFrom] = useState<string>(value.from + '');
  const [to, setTo] = useState<string>(value.to + '');
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setValue({ name: 'num', to: +to, from: +from })
    }}>
      <div style={{ display: 'flex', gap: 10, flexFlow: 'column' }}>
        <TextField label="От" type="number" onChange={(e) => setFrom(e.target.value)} />
        <TextField label="До" type="number" onChange={(e) => setTo(e.target.value)} />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button size="small" type="submit">Применить</Button>
          <Button size="small" type="button" onClick={onClear}>Очистить</Button>
        </div>
      </div>
    </form>
  );
}
