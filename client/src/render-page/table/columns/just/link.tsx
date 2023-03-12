import { Column } from "../../table/types";

export const LinkCell = ({ row, column, navigate }: { column: Column<any>, row: any, navigate: (str: string) => void }) => {
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