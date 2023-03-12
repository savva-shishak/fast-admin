import { Switch, CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { sendAction } from '../../../../App';

export function TableSwitch({ value, row, actionId }: { value: any, row: any, actionId: string }) {
  const [checked, setChecked] = useState(value);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <CircularProgress size={38} />
  }

  return (
    <Switch 
      checked={checked}
      onClick={async () => {
        setLoading(true);
        const newValue = await sendAction(actionId, { row, newValue: !checked });
        setChecked(newValue);
        setLoading(false);
      }}
    />
  );
}