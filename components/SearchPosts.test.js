import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPosts from "./SearchPosts";

describe("SearchPosts", () => {
  const searchPostsProps = {
    setQueryCriteria: jest.fn(),
  };

  test("Find the search button with Icon exist in the document", () => {
    //setQueryCriteria

    render(<SearchPosts {...searchPostsProps} />);

    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();

    //(screen.getByText("Search")).toBeInTheDocument();

    screen.debug();
  });

  test("Should pass valid string to Input field", () => {
    render(<SearchPosts />);

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "This is a test" } });

    expect(input).toHaveValue("This is a test");

    screen.debug();
  });

  test("Should call setQueryCriteria when pressed enter", () => {
    const mockSetQueryCriteria = jest.fn();

    render(<SearchPosts setQueryCriteria={mockSetQueryCriteria} />);

    const newInputValue = "Tool";
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, {
      target: { value: newInputValue },
    });
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    expect(mockSetQueryCriteria).toHaveBeenCalled();

    screen.debug();
  });

  test("Should call setQueryCriteria when pressed enter", () => {
    const mockSetQueryCriteria = jest.fn();

    render(<SearchPosts setQueryCriteria={mockSetQueryCriteria} />);

    const newInputValue = "Tool";
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, {
      target: { value: newInputValue },
    });
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    expect(mockSetQueryCriteria).toHaveBeenCalledWith({
      searchCriteria: "tool",
    });

    screen.debug();
  });
});
