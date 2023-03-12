import { MenuItem, TextField } from "@material-ui/core";

export function SelectInput({ formik, input }: any) {  
  const values = input
    .values
    .map((val: any) => (
      typeof val === 'string' ? { value: val, label: val } : val
    ))
  
  return (
    <TextField
      select 
      label={input.label}
      {...formik.getFieldProps(input.name)}
    >
      {values.map(({ value, label }: any) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
    </TextField>
  )
}