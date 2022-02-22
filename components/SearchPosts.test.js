import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPosts from "./SearchPosts";

jest.mock("../config/fire-config.js");

describe("SearchPosts", () => {
  const searchPostsProps = {
    setPosts: jest.fn(),
  };

  beforeEach(() => {
    setPosts.mockClear();
    render(<SearchPosts {...searchPostsProps} />);
  });

  test("Find the search button with Icon exist in the document", () => {
    render(<SearchPosts {...searchPostsProps} />);

    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();

    screen.debug();
  });

  test("Should pass valid string to Input field", () => {
    render(<SearchPosts />);

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "This is a test" } });

    expect(input).toHaveValue("This is a test");

    screen.debug();
  });

  test("Should call setPosts everytime we type into Input field", () => {
    const mockSetPosts = jest.fn();

    render(<SearchPosts setPosts={mockSetPosts} />);

    const newInputValue = "Tool";
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, {
      target: { value: newInputValue },
    });
    // const button = screen.getByRole("button", { name: /search/i });
    // fireEvent.click(button);

    expect(mockSetPosts).toHaveBeenCalledWith("tool");

    screen.debug();
  });
});
