import { TextField } from "@material-ui/core";

export function EmailInput({ formik, input }: any) {  
  return (
    <TextField 
      type="email"
      label={input.label}
      {...formik.getFieldProps(input.name)}
    />
  );
}