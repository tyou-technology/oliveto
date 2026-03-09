import { render } from '@testing-library/react';
import { DataTable } from '@/components/organisms/data-table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { vi, describe, it, expect } from 'vitest';
import React from 'react';
import { Table } from '@/components/atoms/table';

// Mock the Table atom to spy on renders
vi.mock('@/components/atoms/table', () => ({
  Table: vi.fn(({ children }: any) => <table data-testid="mock-table">{children}</table>),
  // Mock other components to avoid errors
  TableHeader: ({ children }: any) => <thead>{children}</thead>,
  TableBody: ({ children }: any) => <tbody>{children}</tbody>,
  TableRow: ({ children }: any) => <tr>{children}</tr>,
  TableHead: ({ children }: any) => <th>{children}</th>,
  TableCell: ({ children }: any) => <td>{children}</td>,
  TableFooter: ({ children }: any) => <tfoot>{children}</tfoot>,
  TableCaption: ({ children }: any) => <caption>{children}</caption>,
}));

interface TestData {
  id: string;
  name: string;
}

const columns: ColumnDef<TestData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
];

const data: TestData[] = [
  { id: '1', name: 'Test 1' },
  { id: '2', name: 'Test 2' },
];

describe('DataTable Performance', () => {
  it('should not re-render Table when props are referentially stable', () => {
    // Initial render
    const { rerender } = render(<DataTable columns={columns} data={data} />);

    // Expect Table to be called once
    expect(Table).toHaveBeenCalledTimes(1);

    // Re-render with same props
    rerender(<DataTable columns={columns} data={data} />);

    // Expect Table to still be called ONLY once (if memoized)
    expect(Table).toHaveBeenCalledTimes(1);
  });
});
