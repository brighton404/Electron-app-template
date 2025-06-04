// components/DataTable.tsx
import { ReactNode } from 'react';

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onDelete?: (row: T) => void;
};

const DataTable = <T,>({ columns, data, onDelete }: DataTableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>
              {col.header}
            </th>
          ))}
          {onDelete && <th className="ommit">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col, j) => (
              <td key={j}>
                {col.render
                  ? col.render(row[col.accessor], row)
                  : (row[col.accessor] as React.ReactNode)}
              </td>
            ))}
            {onDelete && (
              <td>
                <button onClick={() => onDelete(row)}>
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
