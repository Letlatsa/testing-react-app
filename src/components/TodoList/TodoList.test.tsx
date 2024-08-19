import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList, { Todo } from "./TodoList";
import mockData from "../../mockData";
import { describe, it, expect } from "@jest/globals";

const todos: Todo[] = mockData;

describe("TodoList Component", () => {
    it("should show title of todos", () => {
        render(<TodoList todos={todos} removeHandler={() => {}} updateTodo={() => {}} />);
        mockData.forEach((d) => {
            const todoElement = screen.queryByText(d.title);
            expect(todoElement).not.toBeNull();
        });
    });
});
