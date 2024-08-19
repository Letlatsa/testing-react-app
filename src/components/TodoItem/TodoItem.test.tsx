import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';

// Mock CSS module import
jest.mock('./TodoItem.module.css', () => ({
    itemContainer: 'itemContainer',
    closeBtn: 'closeBtn',
    completed: 'completed',
}));

// Sample todo item
const todo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
};

// Mock functions
const removeHandler = jest.fn();
const updateTodo = jest.fn();

describe('TodoItem Component', () => {
    beforeEach(() => {
        render(
            <TodoItem
                todo={todo}
                removeHandler={removeHandler}
                updateTodo={updateTodo}
            />
        );
    });

    it('renders the todo item title', () => {
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    it('renders the checkbox with correct checked state', () => {
        const checkbox = screen.getByTestId(`checkbox-1`) as HTMLInputElement;
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBe(false);
    });

    it('calls updateTodo function when checkbox is clicked', () => {
        const checkbox = screen.getByTestId(`checkbox-1`);
        fireEvent.click(checkbox);
        expect(updateTodo).toHaveBeenCalledWith(1);
    });

    it('calls updateTodo function when label is clicked', () => {
        const label = screen.getByText('Test Todo');
        fireEvent.click(label);
        expect(updateTodo).toHaveBeenCalledWith(1);
    });

    it('calls removeHandler function when close button is clicked', () => {
        const closeButton = screen.getByTestId(`close-btn-1`);
        fireEvent.click(closeButton);
        expect(removeHandler).toHaveBeenCalledWith(1);
    });
});
