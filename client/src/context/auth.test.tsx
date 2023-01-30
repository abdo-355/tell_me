import { useContext } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import authContext from "./auth-context";
import AuthProvider from "./auth-provider";

const testToken = "randomtokenstring";

describe("<authProvider />", () => {
  //create a dummy component to test the provider on
  const TestComponent = () => {
    const { token, addUser, removeUser } = useContext(authContext);
    return (
      <>
        {!!token && <p>{testToken}</p>}
        <button onClick={() => addUser(testToken)}>add</button>
        <button onClick={() => removeUser()}>remove</button>
      </>
    );
  };

  describe("on initial render", () => {
    test("the token is empty if not not found on the local storage", () => {
      render(<TestComponent />, { wrapper: AuthProvider });

      const tokenMessage = screen.queryByText(testToken);
      expect(tokenMessage).not.toBeInTheDocument();
    });
    test("the token have a value if found on the local storage", () => {
      //set the token in the localStorage
      localStorage.setItem("token", testToken);

      render(<TestComponent />, { wrapper: AuthProvider });

      const tokenMessage = screen.getByText(testToken);
      expect(tokenMessage).toBeInTheDocument();

      //delete the token from the local storage
      localStorage.removeItem("token");
    });
  });

  describe("adding and deleting", () => {
    test("addUser adds a user token to the context state and the local storage when called", () => {
      render(<TestComponent />, { wrapper: AuthProvider });

      const tokenMessage = screen.queryByText(testToken);
      expect(localStorage.getItem("token")).not.toEqual(testToken);
      expect(tokenMessage).not.toBeInTheDocument();

      userEvent.click(screen.getByRole("button", { name: "add" }));

      expect(localStorage.getItem("token")).toBe(testToken);
    });

    test("removeUser removes a user token from the context state and the local storage when called", () => {
      render(<TestComponent />, { wrapper: AuthProvider });

      const tokenMessage = screen.queryByText(testToken);
      expect(localStorage.getItem("token")).toEqual(testToken);
      expect(tokenMessage).toBeInTheDocument();

      userEvent.click(screen.getByRole("button", { name: "remove" }));

      expect(localStorage.getItem("token")).not.toBeTruthy();
    });
  });
});
