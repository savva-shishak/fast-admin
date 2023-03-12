import { Column } from "../../table/types";

export const NumCell = ({ row, column }: { column: Column<any>, row: any }) => (
  <div style={{ textAlign: 'right' }}>{row[column.key]}</div>
);