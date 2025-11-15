import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginForm from "./LoginForm";
import { invalidEmails } from "../../data/testing";



jest.mock("@clerk/clerk-react", () => ({
  useSignIn: jest.fn(() => ({ signIn: { create: jest.fn(() => Promise.resolve({ status: "complete" })) }, isLoaded: true })),
}));

jest.mock("@clerk/clerk-react");

const mockUseSignIn = require("@clerk/clerk-react").useSignIn;

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("<LoginForm />", () => {
  beforeEach(() => {
    mockUseSignIn.mockReturnValue({
      signIn: {
        create: jest.fn(() => Promise.resolve({ status: "complete" }))
      },
      isLoaded: true
    });
  });
  describe("everything renders properly", () => {
    test("have two input fields(email and password) and 'log in' button", () => {
      renderComponent();

      expect(getEmail()).toBeInTheDocument();
      expect(getPassword()).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: /log in/i })
      ).toBeInTheDocument();
    });

    test("have a link to redirect to the the signup page", () => {
      renderComponent();

      const signupLink = screen.getByRole("link", { name: /signup/i });

      expect(signupLink).toHaveAttribute("href", "/auth/signup");
    });
  });

  describe("validation", () => {
    test("display 'this field can't be empty' when any field is empty on blur", () => {
      renderComponent();

      userEvent.click(getEmail());
      userEvent.click(getPassword());

      expect(getEmail()).toHaveAccessibleErrorMessage(/this field can't be empty/i);

      userEvent.click(getPassword());
      userEvent.click(getEmail());

      expect(getPassword()).toHaveAccessibleErrorMessage(/this field can't be empty/i);
    });

    test("the error message disappears when typing anything on the field", () => {
      renderComponent();

      // making the error message show at first
      userEvent.click(getEmail());
      userEvent.click(getPassword());

      expect(getEmail()).toHaveAccessibleErrorMessage(/this field can't be empty/i);

      // typing anything then clicking away from the element
      userEvent.type(getEmail(), "any string");
      userEvent.click(getPassword());
      expect(getEmail()).toHaveAccessibleErrorMessage("");
    });

    describe("testing invalid input", () => {
      invalidEmails.forEach((email) => {
        test(`display 'please enter a valid email' when submitting ${email} as invalid email`, () => {
          renderComponent();

          userEvent.type(getEmail(), email);

          clickLogin();

          expect(getEmail()).toHaveAccessibleErrorMessage(/please enter a valid email/i);
        });
      });
    });

    test("display 'password must be atleast 8 characters' when submitting short/empty password", () => {
      renderComponent();

      clickLogin();
      expect(getPassword()).toHaveAccessibleErrorMessage(
        /password must be atleast 8 characters/i
      );

      userEvent.type(getPassword(), "shortpw");

      clickLogin();
      expect(getPassword()).toHaveAccessibleErrorMessage(
        /password must be atleast 8 characters/i
      );
    });

    test("form submits successfully and redirected to the messages page if fields are valid", async () => {
      renderComponent();

      userEvent.type(getEmail(), "email@example.com");
      userEvent.type(getPassword(), "password");

      await act(async () => {
        clickLogin();
      });

      expect(mockNavigate).toHaveBeenCalledWith("/messages");
    });

    test("component redirects to the messages page when sign in is complete", async () => {
      renderComponent();

      userEvent.type(getEmail(), "email@example.com");
      userEvent.type(getPassword(), "password");

      await act(async () => {
        clickLogin();
      });

      expect(mockNavigate).toHaveBeenCalledWith("/messages");
    });
  });
});

// -------------------- Helper Functions --------------------------
const renderComponent = () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
};

const getEmail = () => {
  return screen.getByRole("textbox", { name: /email/i });
};

const getPassword = () => {
  return screen.getByLabelText(/password/i);
};

const clickLogin = () => {
  userEvent.click(screen.getByRole("button", { name: /log in/i }));
};
