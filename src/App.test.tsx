import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "fetch-mock"; // Import fetch-mock
import mockData from "./mockData";
import App from "./App";

beforeEach(() => {
  // Mock the API call
  fetchMock.mock("https://jsonplaceholder.typicode.com/todos", {
    status: 200,
    body: mockData
  });
});

afterEach(() => {
  fetchMock.restore(); // Restore fetch after each test
});

describe("<App /> tests", () => {
  it("renders <App />", async () => {
    render(<App />);
    
    // Wait for the loading text to be removed
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).toBeNull();
    });
  });

  it("should add a todo item", async () => {
    fetchMock.once(
      'https://jsonplaceholder.typicode.com/todos',
      {
        userId: 3,
        id: Math.floor(Math.random() * 10000) + 1,
        title: "Do math homework",
        completed: false
      }
    );

    render(<App />);
    
    // Simulate adding a todo item
    const input = screen.getByRole('textbox') as HTMLInputElement; // Cast to HTMLInputElement
    const addButton = screen.getByRole('button', { name: /add new todo/i });
    
    // Type in the new todo
    input.value = "Do math homework"; // Set the value directly
    input.dispatchEvent(new Event('input', { bubbles: true })); // Dispatch input event
    addButton.click();
    // Check if the new todo is in the list
    await waitFor(() => {
      expect(screen.getByText(/do math homework/i)).toBeInTheDocument();
    });
  });
});

