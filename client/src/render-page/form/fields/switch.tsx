import { FormControlLabel, Switch } from "@material-ui/core";

export function SwitchInput({ formik, input }: any) {  
  const { values } = formik;
  const { value } =  formik.getFieldProps(input.name);
  return (
    <FormControlLabel
      label={input.label}
      control={
        <Switch
          checked={value} 
          onChange={(e) => formik.setValues({ ...values, [input.name]: !value })}
        />}
    />
  );
}