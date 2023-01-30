import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

describe("<Home />", () => {
  test("clicking the 'Get Started' button navigates to the signup page", () => {
    render(<Home />, { wrapper: BrowserRouter });
    const getStartedButton = screen.getByRole("link", {
      name: /get started →/i,
    });
    expect(getStartedButton).toHaveAttribute("href", "/auth/signup");
  });
});
