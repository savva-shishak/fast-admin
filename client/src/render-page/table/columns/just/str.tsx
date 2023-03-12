import { Column } from "../../table/types";

export const StrCell = ({ row, column }: { column: Column<any>, row: any }) => (
  <i style={{ color: 'blue' }}>{row[column.key]}</i>
);