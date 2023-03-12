import { KeyboardDatePicker } from "@material-ui/pickers";

export function DateInput({ formik, input }: any) {  
  const value = formik.values[input.name];
  return (
    <KeyboardDatePicker
      label={input.label}
      format="d MMM yyyy"
      value={value instanceof Date ? new Date(value) : value}
      onChange={(value) => formik.setFieldValue(input.name, value)}
    />
  );
}