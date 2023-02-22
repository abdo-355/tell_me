import { render, screen } from "@testing-library/react";
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

  it("clicking the yes button triggers the userRemove method and navigates to the home page", () => {
    renderComponent();
    clickButton();

    const yesButton = screen.getByRole("button", { name: /yes/i });

    userEvent.click(yesButton);

    expect(mockRemoveUser).toBeCalled();
    expect(mockNavigate).toBeCalledWith("/");
  });

  it.todo("clicking the no button closes the modal");
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
