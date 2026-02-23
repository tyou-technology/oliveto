import { render, screen } from '@testing-library/react';
import { TagList } from './tag-list';
import { TagResponseDTO } from '@/lib/types/article';
import { vi, describe, it, expect } from 'vitest';

describe('TagList', () => {
  it('renders a list of tags', () => {
    const tags: TagResponseDTO[] = [
      {
        id: '1',
        firmId: 'firm1',
        name: 'Tag 1',
        description: 'Description 1',
        color: '#ff0000',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
      {
        id: '2',
        firmId: 'firm1',
        name: 'Tag 2',
        description: 'Description 2',
        color: '#00ff00',
        createdAt: '2023-01-02T00:00:00Z',
        updatedAt: '2023-01-02T00:00:00Z',
      },
    ];

    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <TagList
        tags={tags}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText('Tag 1')).toBeTruthy();
    expect(screen.getByText('Tag 2')).toBeTruthy();
    expect(screen.getByText('Description 1')).toBeTruthy();
    expect(screen.getByText('Description 2')).toBeTruthy();

    const editButtons = screen.getAllByTitle('Editar');
    expect(editButtons).toHaveLength(2);

    const deleteButtons = screen.getAllByTitle('Excluir');
    expect(deleteButtons).toHaveLength(2);
  });

  it('renders empty state when no tags are provided', () => {
    const tags: TagResponseDTO[] = [];
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <TagList
        tags={tags}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText('Nenhuma tag encontrada')).toBeTruthy();
    expect(screen.getByText('Você ainda não criou nenhuma tag.')).toBeTruthy();
  });
});
