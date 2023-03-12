import { TextField } from "@material-ui/core";

export function StringInput({ formik, input }: any) {  
  return (
    <TextField 
      label={input.label}
      {...formik.getFieldProps(input.name)}
    />
  );
}