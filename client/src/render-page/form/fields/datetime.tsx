import { KeyboardDateTimePicker } from "@material-ui/pickers";

export function Datetime({ formik, input }: any) {  
  const value = formik.values[input.name];
  return (
    <KeyboardDateTimePicker
      label={input.label}
      format="d MMM yyyy hh:mm"
      value={value instanceof Date ? new Date(value) : value}
      onChange={(value) => formik.setFieldValue(input.name, value)}
    />
  );
}