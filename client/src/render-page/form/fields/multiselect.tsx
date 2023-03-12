import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export function MultiSelect({ formik, input }: any) {  
  const options = input
    .values
    .map((val: any) => (
      typeof val === 'string' ? { value: val, label: val } : val
    ))

  const { values } = formik;
  
  return (
    <FormControl>
      <InputLabel>{input.label}</InputLabel>
      <Select
        multiple
        value={values[input.name]}
        onChange={({ target: { value } }) => {
          formik.setFieldValue(
            input.name,
            typeof value === 'string'
              ? value.split(',')
              : value
          );
        }}
      >
        {options.map(({ value, label }: any) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
      </Select>
    </FormControl>
  )
}