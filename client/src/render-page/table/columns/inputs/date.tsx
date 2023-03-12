import { CircularProgress } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useState } from 'react';
import { sendAction } from '../../../../useApp';

export function TableDateInput({ value, row, actionId }: { value: any, row: any, actionId: string }) {
  const [inputValue, setInputValue] = useState(value);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <CircularProgress size={38} />
  }

  return (
    <KeyboardDatePicker
      format="d MMM yyyy"
      value={inputValue instanceof Date ? new Date(inputValue) : inputValue}
      onChange={(value) => setInputValue(value)}
      onBlur={async () => {
        setLoading(true);
        const newValue = await sendAction(actionId, { row, newValue: inputValue });
        setInputValue(newValue)
        setLoading(false);
      }}
    />
  );
}