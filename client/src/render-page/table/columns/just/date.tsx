import moment from "moment";
import { DateColumn } from "../../types";

export const DateCell = ({ row, column }: { column: DateColumn<any>, row: any }) => (
  <span>{moment(row[column.key]).format(column.format)}</span>
);