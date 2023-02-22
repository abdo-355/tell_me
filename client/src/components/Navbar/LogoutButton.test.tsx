import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogoutButton from "./LogoutButton";
import authContext from "../../context/auth-context";

const mockRemoveUser = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("<LogoutButton />", () => {
  it("clicking on the logout button opens the modal", () => {
    renderComponent();
    clickButton();

    const modalText = screen.getByText(/Are you sure you want to logout/i);

    expect(modalText).toBeInTheDocument();
  });

  it("clicking the 'yes' button triggers the userRemove method and navigates to the home page", () => {
    renderComponent();
    clickButton();

    const yesButton = screen.getByRole("button", { name: /yes/i });

    userEvent.click(yesButton);

    expect(mockRemoveUser).toBeCalled();
    expect(mockNavigate).toBeCalledWith("/");
  });

  it("clicking the 'no' button closes the modal", async () => {
    renderComponent();
    clickButton();

    const noButton = screen.getByRole("button", { name: /no/i });
    const modalText = screen.queryByText(/Are you sure you want to logout/i);

    userEvent.click(noButton);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Are you sure you want to logout/i)
    );

    expect(mockRemoveUser).not.toBeCalled();
    expect(modalText).not.toBeInTheDocument();
  });
});

//helper functions

const renderComponent = () => {
  render(
    <authContext.Provider
      value={{
        addUser: () => {},
        isLoggedIn: true,
        removeUser: mockRemoveUser,
        token: "token",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogoutButton />} />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  );
};

const clickButton = () => {
  userEvent.click(screen.getByRole("button", { name: /log out/i }));
};
