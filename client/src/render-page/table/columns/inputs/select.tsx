import { CircularProgress, FormControl, FormHelperText, MenuItem, Select } from "@material-ui/core";
import { useState } from "react";
import { sendAction } from "../../../App";

export function TableSelect({ value, row, values, actionId }: { value: any, row: any, actionId: string, values: (string | {  })[] }) {
  const [checked, setChecked] = useState(value);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <CircularProgress size={38} />
  }

  return (
    <form 
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const newValue = await sendAction(actionId, { row, newValue: !checked });
        setChecked(newValue);
        setLoading(false);
      }}
    >
      <FormControl>
        <Select>
          {values
            .map((val: any) => (typeof val === 'string' ? { value: val, label: val } : val))
            .map(({ value, label }: any) => <MenuItem key={value} value={value}>{label}</MenuItem>)
          }
        </Select>
      </FormControl>
    </form>
  );
}