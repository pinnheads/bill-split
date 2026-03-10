import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import People from './People';

describe('People', () => {
    it('renders heading correctly', () => {
        render(<People people={[]} setPeople={vi.fn()} />);
        expect(screen.getByText('1. Add People')).toBeInTheDocument();
    });

    it('calls setPeople when adding a new person', () => {
        const setPeople = vi.fn();
        render(<People people={[]} setPeople={setPeople} />);
        
        const input = screen.getByPlaceholderText('Enter a name');
        const button = screen.getByText('Add Person');
        
        fireEvent.change(input, { target: { value: 'Alice' } });
        fireEvent.click(button);
        
        // setPeople is called with a functional update
        expect(setPeople).toHaveBeenCalled();
        const functionalUpdate = setPeople.mock.calls[0][0];
        const result = functionalUpdate([]);
        expect(result[0].name).toBe('Alice');
    });

    it('renders existing people list', () => {
        const people = [
            { id: '1', name: 'Alice' },
            { id: '2', name: 'Bob' }
        ];
        render(<People people={people} setPeople={vi.fn()} />);
        
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('calls setPeople to remove a person', () => {
        const people = [{ id: '1', name: 'Alice' }];
        const setPeople = vi.fn();
        render(<People people={people} setPeople={setPeople} />);
        
        const removeButton = screen.getByText('×');
        fireEvent.click(removeButton);
        
        expect(setPeople).toHaveBeenCalled();
        const functionalUpdate = setPeople.mock.calls[0][0];
        const result = functionalUpdate(people);
        expect(result).toHaveLength(0);
    });
});
