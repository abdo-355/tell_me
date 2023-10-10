import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SendMessage from "./SendMessage";

const mockWindow = window;

jest.mock("../hooks/use-axios.ts", () => () => ({
  request: jest.fn(async () => {
    //@ts-ignore
    mockWindow.requestCalled = true;
  }),
}));

describe("<SendMessage />", () => {
  it("should render a text area and a button", () => {
    renderComponent();

    expect(getTextarea()).toBeInTheDocument();
    expect(getButton()).toBeInTheDocument();
  });
  it("should not submit the message and show error message if the text area is empty", () => {
    renderComponent();

    userEvent.click(getButton());

    expect(getTextarea()).toHaveAccessibleErrorMessage(
      /message can't be empty/i
    );
    //@ts-ignore
    expect(mockWindow.requestCalled).toBeFalsy();
  });
  it("should submit the form successfully with valid input", async () => {
    renderComponent();

    userEvent.type(getTextarea(), "test");
    await act(async () => {
      getButton().click();
    });
    //@ts-ignore
    expect(mockWindow.requestCalled).toBeTruthy();
  });
});

// helper functions

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SendMessage />} />
      </Routes>
    </BrowserRouter>
  );
};

const getTextarea = () => {
  return screen.getByRole("textbox", { hidden: true });
};

const getButton = () => {
  return screen.getByRole("button", { name: /send/i });
};
