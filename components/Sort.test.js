import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Sort from "./Sort";

describe("Sort", () => {
  const mockSetSortValue = jest.fn();
  const mockSetSortType = jest.fn();

  beforeEach(() => {
    const sortProps = {
      setSortValue: mockSetSortValue,
      setSortType: mockSetSortType,
    };
    render(<Sort {...sortProps} />);
  });

  // Test1
  it("should render", async () => {
    expect(await screen.findByText("SortBy")).toBeInTheDocument();

    const selectLabel = await screen.findByLabelText("SortBy");
    expect(selectLabel).toBeInTheDocument();
  });

  // Test2
  describe("should setSortValue and setSortType on option selection", () => {
    beforeEach(async () => {
      await selectButton();
    });

    // Test Title Asc &  Desc..
    it("Title Asc", () => {
      //Click an option in the popup and pass value.
      const titleAsc = screen.getByText("Title Asc");
      userEvent.click(titleAsc);

      expect(mockSetSortValue).toHaveBeenCalledWith("title");
      expect(mockSetSortType).toHaveBeenCalledWith("asc");
    });
    it("Title Desc", () => {
      //Click an option in the popup.
      const titleDesc = screen.getByText("Title Desc");
      userEvent.click(titleDesc);

      expect(mockSetSortValue).toHaveBeenCalledWith("title");
      expect(mockSetSortType).toHaveBeenCalledWith("desc");
    });

    // Test Price Asc & Desc
    it("Price Asc", () => {
      //Click an option in the popup.
      const priceAsc = screen.getByText("Price Asc");
      userEvent.click(priceAsc);

      expect(mockSetSortValue).toHaveBeenCalledWith("price");
      expect(mockSetSortType).toHaveBeenCalledWith("asc");
    });
    it("Price Desc", () => {
      //Click an option in the popup.
      const PriceDesc = screen.getByText("Price Desc");
      userEvent.click(PriceDesc);

      expect(mockSetSortValue).toHaveBeenCalledWith("price");
      expect(mockSetSortType).toHaveBeenCalledWith("desc");
    });

    // Test Post Date Asc & Desc
    it("Post Date Asc", () => {
      //Click an option in the popup.
      const PostDateAsc = screen.getByText("Post Date");
      userEvent.click(PostDateAsc);

      expect(mockSetSortValue).toHaveBeenCalledWith("postDate");
      expect(mockSetSortType).toHaveBeenCalledWith("asc");
    });
    it("Post Date Desc", () => {
      //Click an option in the popup.
      const PostDateDesc = screen.getByText("Post Date Desc");
      userEvent.click(PostDateDesc);

      expect(mockSetSortValue).toHaveBeenCalledWith("postDate");
      expect(mockSetSortType).toHaveBeenCalledWith("desc");
    });

    // Test ZipCodes Desc
    it("Zip codes Desc", () => {
      //Click an option in the popup.
      const ZipCodesDesc = screen.getByText("ZipCodes Desc");
      userEvent.click(ZipCodesDesc);

      expect(mockSetSortValue).toHaveBeenCalledWith("zip");
      expect(mockSetSortType).toHaveBeenCalledWith("desc");
    });

    async function selectButton() {
      //Click the Select button
      const selectLabel = await screen.findByLabelText("SortBy");
      userEvent.click(selectLabel);
    }
  });
});
