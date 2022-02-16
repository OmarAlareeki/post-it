import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPosts from "./SearchPosts";
import { JestMockExtended } from "jest-mock-extended";

jest.mock("../config/fire-config.js");

describe("SearchPosts", () => {
  const searchPostsProps = {
    setPosts: JestMockExtended,
    sortType: jest.fn(),
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

  test("Should set setPosts when pressed enter", () => {
    const mockSetPosts = jest.fn();

    render(<SearchPosts setPosts={mockSetPosts} />);

    const newInputValue = "Tool";
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, {
      target: { value: newInputValue },
    });
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    expect(mockSetPosts).toHaveBeenCalled();

    screen.debug();
  });

  // test("Should set setPosts with the searched Term", () => {
  //   const mockSetQueryCriteria = jest.fn();

  //   render(<SearchPosts setQueryCriteria={mockSetQueryCriteria} />);

  //   const newInputValue = "Tool";
  //   const input = screen.getByPlaceholderText("Search");
  //   fireEvent.change(input, {
  //     target: { value: newInputValue },
  //   });
  //   const button = screen.getByRole("button", { name: /search/i });
  //   fireEvent.click(button);

  //   expect(mockSetQueryCriteria).toHaveBeenCalledWith({
  //     searchCriteria: "tool",
  //   });

  //   screen.debug();
  // });
});
