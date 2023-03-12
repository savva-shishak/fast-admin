import { IconButton } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import { toast } from "react-toastify";
import { Column } from "../../table/types";

export const KeyCell = ({ row, column }: { column: Column<any>, row: any }) => (
  <div>
    <IconButton
      style={{ marginRight: 10 }}
      size="small"
      onClick={() => {
        navigator.clipboard.writeText(row[column.key]);
        toast.info('Скопировано')
      }}
    >
      <FileCopy />
    </IconButton>
    {row[column.key].slice(0, 5)}
    ...
  </div>
)