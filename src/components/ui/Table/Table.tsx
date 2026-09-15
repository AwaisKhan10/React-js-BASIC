import type {
  HTMLAttributes,
  Key,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { cn } from '@/utils/cn';
import styles from './Table.module.css';

export interface TableColumn<T> {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => Key;
  striped?: boolean;
  stickyHeader?: boolean;
  scrollable?: boolean;
  className?: string;
  empty?: ReactNode;
}

export function Table<T>({
  columns,
  rows,
  getRowId,
  striped,
  stickyHeader,
  scrollable = true,
  className,
  empty,
}: TableProps<T>) {
  const table = (
    <table
      className={cn(
        styles.table,
        striped ? styles.striped : undefined,
        stickyHeader ? styles.stickyHeader : undefined,
        className,
      )}
    >
      <thead className={styles.head}>
        <tr>
          {columns.map((col) => (
            <th key={col.id} scope="col" className={cn(styles.th, col.className)}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={getRowId(row)} className={styles.row}>
            {columns.map((col) => (
              <td key={col.id} className={cn(styles.td, col.className)}>
                {col.cell(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (rows.length === 0 && empty) {
    return <div className={styles.empty}>{empty}</div>;
  }

  if (!scrollable) return table;
  return <div className={styles.scroll}>{table}</div>;
}

export function TableHead({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn(styles.head, className)} {...rest} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TableRow({ className, ...rest }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn(styles.row, className)} {...rest} />;
}

export function TableHeaderCell({ className, ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn(styles.th, className)} scope={rest.scope ?? 'col'} {...rest} />;
}

export function TableCell({ className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn(styles.td, className)} {...rest} />;
}

export function TableCaption({ children, className }: { children: ReactNode; className?: string }) {
  return <caption className={cn(styles.caption, className)}>{children}</caption>;
}
