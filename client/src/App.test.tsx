import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

describe("<App />", () => {
  test("renders the home page for initial load", () => {
    render(<App />, { wrapper: BrowserRouter });
    const homeHeader = screen.getByRole("heading", {
      name: /let them tell you/i,
    });

    expect(homeHeader).toBeInTheDocument();
  });

  test("clicking the 'log in' button navigates to the login page", () => {
    render(<App />, { wrapper: BrowserRouter });
    const loginButton = screen.getByRole("link", {
      name: /log in/i,
    }) as HTMLInputElement;

    expect(loginButton).toHaveAttribute("href", "/auth/login");
  });

  test("clicking the 'sign up' button navigates to the signup page", () => {
    render(<App />, { wrapper: BrowserRouter });
    const signupButton = screen.getByRole("link", {
      name: /sign up/i,
    }) as HTMLInputElement;
    expect(signupButton).toHaveAttribute("href", "/auth/signup");
  });
});
