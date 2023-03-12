import { Button, IconButton } from "@material-ui/core";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { socket } from "../../App";
import { TableCheckbox } from "./columns/inputs/check";
import { TableComponent } from './table/Table'
import { FileCopy } from '@material-ui/icons';
import { toast } from "react-toastify";

const justColumns = [
  ['date', ],
  ['enum', ],
  ['file', ],
  ['img', ],
  ['key', ],
  ['link', ],
  ['num', ],
  ['str', ],
];

const inputColumns = [
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
];

export function Table({ config }: any) {
  const navigate = useNavigate();
  return (
    <TableComponent
      columns={config.columns.map((column: any) => ({
        key: column.key as any,
        title: column.title,
        type: ['link', 'password'].includes(column.type) ? 'str' : column.type as any,
        values: column.values,
        render(row: any) {
          if (row[column.key] === null || row[column.key] === undefined) {
            return null;
          }

          if (column.type === 'date') {
            return moment(row[column.key]).format(column.format)
          }

          if (column.type === 'link') {
            const { href, label } = row[column.key];

            if (href.startsWith('http')) {
              return <a href={href} target="_blank">{label}</a>
            } else {
              return (
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(href);
                  }}
                >
                  {label}
                </a>
              );
            }
          }

          if (column.type === 'img') {
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={row[column.key]} alt={column.key} style={{ height: 50, width: 'auto' }} />
                <a href={row[column.key]} target="_blank">
                  <Button size="small">
                    Скачать
                  </Button>
                </a>
              </div>
            )
          }

          if (column.type === 'key') {
            return (
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
          }

          if (column.type === 'check') {
            return (
              <TableCheckbox value={row[column.key]} row={row} actionId={column.onChange} />
            );
          }

          if (column.type === 'select') {
            return (
              <TableSelect values={column.values} value={row[column.key]} row={row} actionId={column.onChange} />
            );
          }

          // if (column.type === 'multiselect') {
          //   return (
          //     <AdminMultiSelect options={column.options} value={row[column.key]} row={row} actionId={column.onChange} />
          //   );
          // }

          if (column.type === 'str' && column.onChange) {
            return (
              <TableStrInput value={row[column.key]} row={row} actionId={column.onChange} />
            );
          }

          if (column.type === 'html') {
            return <div dangerouslySetInnerHTML={{ __html: row[column.key] }} />;
          }

          return row[column.key];
        }
      }))}
      getData={(params) => {
        return new Promise((res) => {
          const id = v4();
          socket.emit('admin-message', { target: 'action', actionId: config.getData, respondId: id, params })
          
          socket.on('admin-message', onAction)

          function onAction(data: any) {
            if (data.target === 'action' && data.action === id) {
              socket.off('admin-message', onAction);
              res(data.data);
            }
          }
        });
      }}
    />
  );
}