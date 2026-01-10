import { ColumnGroup as PrimeColumnGroup } from 'primereact/columngroup';
import { Row as PrimeRow } from 'primereact/row';
import { Column as PrimeColumn } from 'primereact/column';
import { ReactNode } from 'react';

// Re-export PrimeReact components for convenience
export { PrimeColumnGroup as ColumnGroup, PrimeRow as Row, PrimeColumn as Column };

export interface TableFooterColumn {
  colSpan?: number;
  content: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableFooterProps {
  columns: TableFooterColumn[];
  className?: string;
}

/**
 * Helper para criar footer de tabela
 */
export function TableFooter({ columns, className }: TableFooterProps) {
  return (
    <PrimeColumnGroup>
      <PrimeRow className={className}>
        {columns.map((col, index) => (
          <PrimeColumn
            key={index}
            colSpan={col.colSpan}
            footer={col.content}
            footerStyle={{ textAlign: col.align || 'left' }}
            footerClassName={col.className}
          />
        ))}
      </PrimeRow>
    </PrimeColumnGroup>
  );
}

export interface TableHeaderGroupColumn {
  header: string;
  colSpan?: number;
  rowSpan?: number;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableHeaderGroupRow {
  columns: TableHeaderGroupColumn[];
}

export interface TableHeaderGroupProps {
  rows: TableHeaderGroupRow[];
  className?: string;
}

/**
 * Helper para criar header agrupado
 */
export function TableHeaderGroup({ rows, className }: TableHeaderGroupProps) {
  return (
    <PrimeColumnGroup>
      {rows.map((row, rowIndex) => (
        <PrimeRow key={rowIndex} className={className}>
          {row.columns.map((col, colIndex) => (
            <PrimeColumn
              key={colIndex}
              header={col.header}
              colSpan={col.colSpan}
              rowSpan={col.rowSpan}
              headerStyle={{ textAlign: col.align || 'center' }}
              headerClassName={col.className}
            />
          ))}
        </PrimeRow>
      ))}
    </PrimeColumnGroup>
  );
}

/**
 * Exemplo de uso:
 * 
 * Header Agrupado:
 * <DataTable 
 *   headerColumnGroup={
 *     <TableHeaderGroup rows={[
 *       {
 *         columns: [
 *           { header: 'Informações Pessoais', colSpan: 3 },
 *           { header: 'Endereço', colSpan: 2 }
 *         ]
 *       },
 *       {
 *         columns: [
 *           { header: 'Nome' },
 *           { header: 'Email' },
 *           { header: 'Telefone' },
 *           { header: 'Cidade' },
 *           { header: 'Estado' }
 *         ]
 *       }
 *     ]} />
 *   }
 * />
 * 
 * Footer com totais:
 * <DataTable
 *   footerColumnGroup={
 *     <TableFooter columns={[
 *       { content: 'Total:', colSpan: 3, align: 'right' },
 *       { content: 'R$ 1.234,56', align: 'right' }
 *     ]} />
 *   }
 * />
 */
