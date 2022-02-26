import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer from './Footer'

describe("Footer", () => {
  test('the footer has year present', () => {
    render(<Footer />);
    const year = screen.getByText(/2022/i)
    expect(year).toBeInTheDocument()
  });
})