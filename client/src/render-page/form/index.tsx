import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import { useFormik } from "formik";
import { socket } from "../../App";
import { DateInput } from "./fields/date";
import { Datetime } from "./fields/datetime";
import { MultiSelect } from "./fields/multiselect";
import { NumberInput } from "./fields/num";
import { RangeInput } from "./fields/range";
import { SelectInput } from "./fields/select";
import { StringInput } from "./fields/str";
import { CheckInput } from "./fields/check";
import { SwitchInput } from "./fields/switch";
import { Time } from "./fields/time";
import { UrlInput } from "./fields/url";
import { EmailInput } from "./fields/email";
import { PasswordInput } from "./fields/password";

const inputs = [
  ['str', StringInput],
  ['url', UrlInput],
  ['email', EmailInput],
  ['password', PasswordInput],
  ['num', NumberInput],
  ['range', RangeInput],
  ['check', CheckInput],
  ['swith', SwitchInput],
  ['select', SelectInput],
  ['multiselect', MultiSelect],
  ['date', DateInput],
  ['datetime', Datetime],
  ['time', Time],
  // ['file', StringInput],
  // ['daterange', StringInput],
]

export function Form({ config }: any) {  
  const formik = useFormik({
    initialValues: config.inputs.reduce((acc: any, { value, name }: any) =>({ ...acc, [name]: value }), {}),
    onSubmit() {}
  });

  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap',  }}>
      <Card style={{ width: '100%' }}>
        <CardContent style={{ display: 'grid', gridTemplateColumns: `repeat(${config.columns || 3}, 1fr)`, gap: 15 }}>
          {config
            .inputs
            .map((input: any) => {
              const [, Component] = inputs.find(([type]) => type === input.type) || [null, null];

              return Component && <Component formik={formik} input={input} />; 
            })}
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          {config
            .buttons
            .map((btn: any) => (
              <Button 
                color={btn.type}
                variant="contained"
                onClick={() => {
                  socket.emit('admin-message', { target: 'action', actionId: btn.handler, params: formik.values })
                }}
              >
                {btn.label}
              </Button>
            ))}
        </CardActions>
      </Card>
    </div>
  );
}