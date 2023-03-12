import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { DateFilter } from "../types";

export type StateValue<Data> = { value?: Data, setValue: (v: Data) => any, onClear: () => void }

export function DateFilterForm(
  {
    value = { name: 'date', from: new Date(), to: new Date() },
    setValue,
    onClear
  }: StateValue<DateFilter>
) {
  const [from, setFrom] = useState<string>(value.from + '');
  const [to, setTo] = useState<string>(value.to + '');
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setValue({ name: 'date', to: new Date(from), from: new Date(to) })
    }}>
      <div style={{ display: 'flex', gap: 10, flexFlow: 'column' }}>
        <TextField label="От" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <TextField label="До" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button size="small" type="submit">Применить</Button>
          <Button size="small" type="button" onClick={onClear}>Очистить</Button>
        </div>
      </div>
    </form>
  );
}
