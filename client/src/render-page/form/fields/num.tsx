import { TextField } from "@material-ui/core";

export function NumberInput({ formik, input }: any) {  
  return (
    <TextField 
      label={input.label}
      type="number"
      {...formik.getFieldProps(input.name)}
    />
  );
}