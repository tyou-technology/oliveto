import { render } from '@testing-library/react';
import { DataTableRow } from './data-table-row';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Row } from '@tanstack/react-table';

// Mock flexRender
vi.mock('@tanstack/react-table', async () => {
  const actual = await vi.importActual('@tanstack/react-table');
  return {
    ...actual,
    flexRender: () => 'Cell Content',
  };
});

// Mock Table components
vi.mock('@/components/atoms/table', () => ({
  TableRow: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
  TableCell: ({ children, ...props }: any) => <td {...props}>{children}</td>,
}));

describe('DataTableRow Performance', () => {
  let mockRow: Row<any>;

  beforeEach(() => {
    mockRow = {
      id: '1',
      getIsSelected: () => false,
      getVisibleCells: () => [
        {
          id: 'cell-1',
          column: { columnDef: { cell: () => 'Cell' } },
          getContext: () => ({}),
        },
      ],
    } as any;
  });

  it('does not re-render when props are identical', () => {
    const spy = vi.spyOn(mockRow, 'getVisibleCells');

    const { rerender } = render(
      <table>
        <tbody>
          <DataTableRow row={mockRow} />
        </tbody>
      </table>
    );

    expect(spy).toHaveBeenCalledTimes(1);

    // Rerender with SAME row object
    rerender(
      <table>
        <tbody>
          <DataTableRow row={mockRow} />
        </tbody>
      </table>
    );

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('re-renders when row prop changes', () => {
    const spy = vi.spyOn(mockRow, 'getVisibleCells');

    const { rerender } = render(
      <table>
        <tbody>
          <DataTableRow row={mockRow} />
        </tbody>
      </table>
    );

    expect(spy).toHaveBeenCalledTimes(1);

    // Create a new row object with a fresh getVisibleCells method
    // to avoid copying the spy from mockRow (since we spread mockRow)
    const newRow = {
      ...mockRow,
      id: '2',
      getVisibleCells: () => [
        {
          id: 'cell-1',
          column: { columnDef: { cell: () => 'Cell' } },
          getContext: () => ({}),
        },
      ]
    } as any;

    const newSpy = vi.spyOn(newRow, 'getVisibleCells');

    rerender(
      <table>
        <tbody>
          <DataTableRow row={newRow} />
        </tbody>
      </table>
    );

    // React 19 / Strict Mode might cause double invocation on re-renders in tests.
    // We just want to ensure it DID re-render (>= 1 call).
    expect(newSpy.mock.calls.length).toBeGreaterThanOrEqual(1);

    // Old spy count remains 1
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
