import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginForm from "./LoginForm";
import { invalidEmails } from "../../data/testing";

const mockWindow = window;
const mockStatus = jest.fn(() => 0);

jest.mock("../../hooks/use-axios", () => () => ({
  request: jest.fn(async () => {
    //@ts-ignore
    mockWindow.fetchCalled = true;
  }),
  statusCode: mockStatus(),
  data: { token: "token" },
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("<LoginForm />", () => {
  beforeEach(() => {
    mockStatus.mockReturnValue(0);
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

      expect(getEmail()).toHaveErrorMessage(/this field can't be empty/i);

      userEvent.click(getPassword());
      userEvent.click(getEmail());

      expect(getPassword()).toHaveErrorMessage(/this field can't be empty/i);
    });

    test("the error message disappears when typing anything on the field", () => {
      renderComponent();

      // making the error message show at first
      userEvent.click(getEmail());
      userEvent.click(getPassword());

      expect(getEmail()).toHaveErrorMessage(/this field can't be empty/i);

      // typing anything then clicking away from the element
      userEvent.type(getEmail(), "any string");
      userEvent.click(getPassword());
      expect(getEmail()).toHaveErrorMessage("");
    });

    describe("testing invalid input", () => {
      invalidEmails.forEach((email) => {
        test(`display 'please enter a valid email' when submitting ${email} as invalid email`, () => {
          renderComponent();

          userEvent.type(getEmail(), email);

          clickLogin();

          expect(getEmail()).toHaveErrorMessage(/please enter a valid email/i);
        });
      });
    });

    test("display 'password must be atleast 8 characters' when submitting short/empty password", () => {
      renderComponent();

      clickLogin();
      expect(getPassword()).toHaveErrorMessage(
        /password must be atleast 8 characters/i
      );

      userEvent.type(getPassword(), "shortpw");

      clickLogin();
      expect(getPassword()).toHaveErrorMessage(
        /password must be atleast 8 characters/i
      );
    });

    test("form submits successfully and redirected to the messages page if fields are valid", () => {
      renderComponent();

      userEvent.type(getEmail(), "email@example.com");
      userEvent.type(getPassword(), "password");

      clickLogin();

      //@ts-ignore
      expect(window.fetchCalled).toBe(true);
    });

    test("component redirects to the messages page for 202 status code", () => {
      mockStatus.mockReturnValue(202);

      renderComponent();

      expect(mockNavigate).toBeCalled();
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
