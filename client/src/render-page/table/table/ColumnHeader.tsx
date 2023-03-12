import {
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TableCell,
  Typography
} from '@material-ui/core';
import "./Table.scss";
import FilterAndSortPng from './icons/filter_and_sort.png';
import { DateFilterForm, EnumFilterForm, NumberFilterForm, StringFilterForm } from "./filters";
import { Column, JustFilter, TableFilter, TableSort } from './types';
import { Dispatch, SetStateAction } from 'react';

type Params = {
  column: Column<any>
  sort: TableSort[];
  filter: TableFilter[];
  excludeNull: string[];
  setOverlayColumn: Dispatch<SetStateAction<string | null>>;
  overlayColumn: string | null;
  getSortRadio: (columnKey: string) => "not" | 'desc' | "asc";
  setSortRadio: (columnKey: string, value: "not" | 'desc' | "asc") => void;
  setExcludeNull: Dispatch<SetStateAction<string[]>>;
  inputFiltersProps: (columnKey: string) => {
    value: any;
    setValue: (value: JustFilter) => void;
    onClear(): void;
  };
}

export function ColumnHeader(
  {
    column,
    sort,
    filter,
    excludeNull,
    setOverlayColumn,
    overlayColumn,
    getSortRadio,
    setSortRadio,
    setExcludeNull,
    inputFiltersProps,
  }: Params
) {

  return (
    <TableCell key={column.key} size={column.width as any}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {column.title}
        <Button
          size="small"
          variant={(
            sort.concat(filter as any).some((item: any) => item.columnKey === column.key)
            || excludeNull.includes(column.key)
              ? "contained"
              : "outlined"
          )}
          onClick={() => setOverlayColumn(column.key)}
        >
          <img className="icon" src={FilterAndSortPng} alt="filterandsort" />
        </Button>
        <Drawer
          anchor="right"
          open={overlayColumn === column.key}
          onClose={() => setOverlayColumn(null)}
        >
          <div className="table__column-params">
            <div className="table__prop">
              <Typography variant="h5">
                Параметры колонки <br/> "{column.title}""
              </Typography>
              <FormGroup>
                <FormControl>
                  <FormLabel>Сотрировка</FormLabel>
                  <RadioGroup value={getSortRadio(column.key)} onChange={(e) => setSortRadio(column.key, e.target.value as any)}>
                    <FormControlLabel control={<Radio />} value="asc" label="от А до Я" />
                    <FormControlLabel control={<Radio />} value="desc" label="от Я до А" />
                    <FormControlLabel control={<Radio />} value="not" label="Нет" />
                  </RadioGroup>
                </FormControl>
                Фильтр
                <FormControlLabel 
                  control={
                    <Checkbox
                      checked={!excludeNull.includes(column.key)}
                      onClick={() => {
                        setExcludeNull(
                          excludeNull.includes(column.key)
                            ? excludeNull.filter((item: any) => item !== column.key)
                            : [...excludeNull, column.key]
                        )
                      }}
                    />
                  }
                  label="Показать пустые"
                  />
                {['str', 'password'].includes(column.type) && (
                  <StringFilterForm {...inputFiltersProps(column.key)} />
                )}
                {column.type === 'num' && (
                  <NumberFilterForm {...inputFiltersProps(column.key)} />
                )}
                {column.type === 'date' && (
                  <DateFilterForm {...inputFiltersProps(column.key)} />
                )}
                {column.type === 'enum' && (
                  <EnumFilterForm {...inputFiltersProps(column.key)} />
                )}
              </FormGroup>
            </div>
          </div>
        </Drawer>
      </div>
    </TableCell>
  )
}