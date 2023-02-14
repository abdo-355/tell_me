import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./Navbar";

describe("<Navbar />", () => {
  it("clicking the 'log in' button navigates to the login page", () => {
    render(<Navbar />, { wrapper: BrowserRouter });
    const loginButton = screen.getByRole("link", {
      name: /log in/i,
    }) as HTMLInputElement;

    expect(loginButton).toHaveAttribute("href", "/auth/login");
  });

  it("clicking the 'sign up' button navigates to the signup page", () => {
    render(<Navbar />, { wrapper: BrowserRouter });
    const signupButton = screen.getByRole("link", {
      name: /sign up/i,
    }) as HTMLInputElement;
    expect(signupButton).toHaveAttribute("href", "/auth/signup");
  });

  it("should have navigation links to the url generator and messages page with the home page", () => {
    render(<Navbar />, { wrapper: BrowserRouter });
    const navLinks = screen.getAllByRole("link");
    expect(navLinks[0]).toHaveAttribute("href", "/");
    expect(navLinks[1]).toHaveAttribute("href", "/geturl");
    expect(navLinks[2]).toHaveAttribute("href", "/messages");
  });
});
