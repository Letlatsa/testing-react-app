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
      '/api/todo',
      {
        userId: 3,
        id: Math.floor(Math.random() * 100) + 1,
        title: "Do math homework",
        completed: false
      }
    );});
});
