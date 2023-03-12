import {
  Button,
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import "./Table.scss"
import { TableType } from "./types";
import UpdatePng from './icons/update.png';
import SearchPng from './icons/search.png';
import LoadingPng from './icons/loading.gif';
import { useTable } from "./useTable";
import { ColumnHeader } from './ColumnHeader';
import { Paginator } from './Paginator';

export function TableComponent<Data = any>({ columns, getData, itemRef }: TableType<Data>) {
  const {
    setSearch,
    renderData,
    loading,
    data,
    paginatorProps,
    columnHeaderData,
  } = useTable({ columns, getData, itemRef });

  return (
    <div className="table-container">
      <div className="table__header">
        <div className="table__settings">
          <form onSubmit={(e) => {
            e.preventDefault();
            setSearch((e.target as any).elements.search.value)
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField name="search" label="Поиск" />
              <Button type="submit">
                <img className="icon" src={SearchPng} alt="search" />
              </Button>
            </div>
          </form>
          <Button onClick={renderData}>
            <img className="icon" src={UpdatePng} alt="update" />
          </Button>
        </div>
      </div>
      <div className="table__content">
        <MUITable>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <ColumnHeader 
                  column={column}
                  {...columnHeaderData}
                />
              ))}
            </TableRow>
          </TableHead>
            <TableBody>
              {!loading && data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key} style={{ width: column.width }}>
                      {column.render(item, index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
        </MUITable>
        {loading && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', zIndex: +100 }}>
            <img style={{ height: 300 }} src={LoadingPng} alt="loading" />
          </div>
        )}
      </div>
      <div className="table__footer">
        <Paginator {...paginatorProps} />
      </div>
    </div>
  )
}