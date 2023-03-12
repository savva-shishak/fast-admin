import { TextField } from "@material-ui/core";

export function UrlInput({ formik, input }: any) {  
  return (
    <TextField 
      type="url"
      label={input.label}
      {...formik.getFieldProps(input.name)}
    />
  );
}