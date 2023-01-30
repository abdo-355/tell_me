import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Form from "./Form";

describe("<Form />", () => {
  test("signup page is displayed when the pathname is '/auth/signup'", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Form />
      </MemoryRouter>
    );

    const signupButton = screen.getByRole("button", { name: /sign up/i });

    expect(signupButton).toBeInTheDocument();
  });
  test("login page is displayed when the pathname is '/auth/login'", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Form />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: /log in/i });

    expect(loginButton).toBeInTheDocument();
  });
  test("the back arrow goes back to the home page", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Form />
      </MemoryRouter>
    );

    const backArrow = screen.getByRole("link", {
      name: "",
    }) as HTMLAnchorElement;

    expect(backArrow).toBeInTheDocument();
    expect(backArrow).toHaveAttribute("href", "/");
  });
});
