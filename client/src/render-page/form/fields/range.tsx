import { Slider, Typography } from "@material-ui/core";

export function RangeInput({ formik, input }: any) {  
  const { values } = formik;
  const { value } =  formik.getFieldProps(input.name);

  return (
    <div>
      <Typography>{input.label} ({formik.values[input.name] || 0})</Typography>
      <Slider 
        step={input.step}
        min={input.min}
        max={input.max}
        value={value}
        onChange={(_, newValue) => formik.setValues({ ...values, [input.name]: newValue })}
      />
    </div>
  );
}