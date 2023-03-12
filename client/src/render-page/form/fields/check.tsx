import { Checkbox, FormControlLabel } from "@material-ui/core";

export function CheckInput({ formik, input }: any) {  
  const { values } = formik;
  const { value } =  formik.getFieldProps(input.name);
  return (
    <FormControlLabel
      label={input.label}
      control={
        <Checkbox 
          checked={value} 
          onChange={(e) => formik.setValues({ ...values, [input.name]: !value })}
        />}
    />
  );
}