import { CircularProgress, TextField } from "@material-ui/core";
import { useState } from "react";
import { sendAction } from "../../../../App";

export function TableEmailInput({ value, row, actionId }: { value: any, row: any, actionId: string }) {
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState(value);

  if (loading) {
    return <CircularProgress size={38} />
  }

  const submit = async () => {
    setLoading(true);
    const newValue = await sendAction(actionId, { row, newValue: inputValue });
    setInputValue(newValue)
    setLoading(false);
  }

  return (
    <form 
      onSubmit={async (e) => {
        e.preventDefault();
        submit();
      }}
    >
      <TextField 
        onBlur={submit} 
        size="small"
        type="email"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}