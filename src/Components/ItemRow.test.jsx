import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemRow from './ItemRow';

describe('ItemRow', () => {
    const mockItem = {
        id: '1',
        name: 'Coffee',
        price: 5.5,
        assignedTo: ''
    };
    const mockPeople = [
        { id: 'p1', name: 'Alice' },
        { id: 'p2', name: 'Bob' }
    ];
    const mockOnUpdate = vi.fn();
    const mockOnRemove = vi.fn();

    it('renders item details correctly', () => {
        render(
            <ItemRow 
                item={mockItem} 
                people={mockPeople} 
                onUpdate={mockOnUpdate} 
                onRemove={mockOnRemove} 
            />
        );

        expect(screen.getByDisplayValue('Coffee')).toBeInTheDocument();
        expect(screen.getByDisplayValue('5.5')).toBeInTheDocument();
    });

    it('calls onUpdate when name changes', () => {
        render(
            <ItemRow 
                item={mockItem} 
                people={mockPeople} 
                onUpdate={mockOnUpdate} 
                onRemove={mockOnRemove} 
            />
        );

        const nameInput = screen.getByDisplayValue('Coffee');
        fireEvent.change(nameInput, { target: { value: 'Tea' } });

        expect(mockOnUpdate).toHaveBeenCalledWith('1', { name: 'Tea' });
    });

    it('calls onRemove when the remove button is clicked', () => {
        render(
            <ItemRow 
                item={mockItem} 
                people={mockPeople} 
                onUpdate={mockOnUpdate} 
                onRemove={mockOnRemove} 
            />
        );

        const removeButton = screen.getByText('×');
        fireEvent.click(removeButton);

        expect(mockOnRemove).toHaveBeenCalledWith('1');
    });
});
