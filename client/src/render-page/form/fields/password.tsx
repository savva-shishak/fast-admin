import { TextField } from "@material-ui/core";

export function PasswordInput({ formik, input }: any) {  
  return (
    <TextField 
      label={input.label}
      type="password"
      {...formik.getFieldProps(input.name)}
    />
  );
}