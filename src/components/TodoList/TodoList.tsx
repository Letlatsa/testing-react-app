import React from "react";
import TodoItem from "../TodoItem/TodoItem";

// Define the type for a single Todo item
export interface Todo {
    id: number;
    title: string; // Title of the todo item
    completed: boolean; // Add the completed property
}

// Define the props for the TodoList component
interface TodoListProps {
    todos: Todo[];
    removeHandler: (id: number) => void;
    updateTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, removeHandler, updateTodo }) => (
    <>
        {todos.map((t) => (
            <TodoItem 
                key={t.id} 
                todo={{
                    ...t,
                    title: getTitles(t.title)
                }} 
                removeHandler={removeHandler} 
                updateTodo={updateTodo} 
            />
        ))}
    </>
);

function getTitles(title: string): string {
    // Replace the titles with their English equivalents
    switch (title) {
        case "delectus aut autem":
            return "Check meetings on the calendar";
        case "quis ut nam facilis et officia qui":
            return "Workouts";
        case "fugiat veniam minus":
            return "Lunch With Friends ";
        case "et porro tempora":
            return "Work hard to complete the udemy course and take a break";
        case "laboriosam mollitia et enim quasi adipisci quia provident illum":
            return "Resting before study session ";
        default:
            return title;
    }
}

export default TodoList;