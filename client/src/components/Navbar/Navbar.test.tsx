import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./Navbar";

jest.mock("@clerk/clerk-react");

const mockUseAuth = require("@clerk/clerk-react").useAuth;

describe("<Navbar />", () => {
  describe("if Logged in", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ isSignedIn: true });
    });

    it("should have navigation links to the url generator and messages page with the home page and a logout button", () => {
      render(<Navbar />, { wrapper: BrowserRouter });

      const urlLink = screen.getByRole("link", { name: /url/i });
      const messageLink = screen.getByRole("link", { name: /messages/i });
      const homeLink = screen.getByRole("link", { name: /website logo/i });
      const logoutButton = screen.getByRole("button", { name: /log out/i });

      expect(urlLink).toHaveAttribute("href", "/geturl");
      expect(messageLink).toHaveAttribute("href", "/messages");
      expect(homeLink).toHaveAttribute("href", "/");
      expect(logoutButton).toBeInTheDocument();
    });
  });

  describe("if not logged in", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ isSignedIn: false });
    });

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
  });
});
