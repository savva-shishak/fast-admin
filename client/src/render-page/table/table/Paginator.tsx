import {
  Button,
  TextField,
} from '@material-ui/core';
import "./Table.scss";
import LeftPng from './icons/left.png';
import RightPng from './icons/right.png';

export function Paginator({
  limit,
  setLimit,
  offset,
  setOffset,
  totalFiltredRows,
  totalRows
}: any) {
  return (
    <>
      Показывать
      <TextField 
        style={{ width: '60px' }}
        type="number"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
      Показаны
      <Button
        size="small"
        variant="text"
        disabled={offset === 0}
        onClick={() => setOffset(Math.max(offset - +limit, 0))}
        onDoubleClick={() => setOffset(0)}
      >
        <img className="icon" src={LeftPng} alt="prev" />
      </Button>
      <div>
        {offset + 1} - {Math.min(offset + +limit, totalFiltredRows)}
      </div>
      <Button
        size="small"
        variant="text"
        disabled={totalFiltredRows <= +offset + +limit}
        onClick={() => setOffset(offset + +limit)}
        onDoubleClick={() => setOffset(totalFiltredRows - +limit)}
      >
        <img className="icon" src={RightPng} alt="next" />
      </Button>
      <span>
        Всего отфильтровано {totalFiltredRows} из {totalRows}
      </span>
    </>
  )
}