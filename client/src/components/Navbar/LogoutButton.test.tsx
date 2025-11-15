import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogoutButton from "./LogoutButton";

jest.mock("@clerk/clerk-react");

const mockUseAuth = require("@clerk/clerk-react").useAuth;
const mockSignOut = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("<LogoutButton />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({ signOut: mockSignOut });
  });

  it("clicking on the logout button opens the modal", () => {
    renderComponent();
    clickButton();

    const modalText = screen.getByText(/Are you sure you want to logout/i);

    expect(modalText).toBeInTheDocument();
  });

  it("clicking the 'yes' button triggers signOut and navigates to the home page", async () => {
    renderComponent();
    clickButton();

    const yesButton = screen.getByRole("button", { name: /yes/i });

    await userEvent.click(yesButton);

    expect(mockSignOut).toBeCalled();
    expect(mockNavigate).toBeCalledWith("/");
  });

  it("clicking the 'no' button closes the modal", async () => {
    renderComponent();
    clickButton();

    const noButton = screen.getByRole("button", { name: /no/i });

    userEvent.click(noButton);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Are you sure you want to logout/i)
    );

    expect(mockSignOut).not.toBeCalled();
  });
});

//helper functions

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogoutButton />} />
      </Routes>
    </BrowserRouter>
  );
};

const clickButton = () => {
  userEvent.click(screen.getByRole("button", { name: /log out/i }));
};
