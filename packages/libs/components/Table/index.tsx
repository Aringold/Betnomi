import React from 'react';
import cx from 'classnames';
import { useTable, useSortBy } from 'react-table';
import styles from './styles.module.scss';

type Props = {
  type?: string,
  tableClassName?: string,
  columns: any,
  data: any,
};
interface Data {
  name: string;
  username: string;
  bet: number;
  multiplier: number;
  payout: number;
}

export const Table: React.FC<Props> = ({
  type = 'primary', columns, data, tableClassName, 
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Data>({ columns, data }, useSortBy);
  return (
    <table className={cx(styles[type === 'primary' ? 'table' : 'STable'], tableClassName)} {...getTableProps()}>
      <thead className={type === 'primary' ? styles.head : styles.headSecondary}>
        {headerGroups.map((headerGroup) => (
          <tr className={styles.tr} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className={type === 'primary' ? styles.th : styles.thSecondary} {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={styles.thBody} {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className={styles.tr} {...row.getRowProps()}>
              {row.cells.map((cell) => <td className={type === 'primary' ? styles.td : styles.tdSecondary} {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
