import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import SignupForm from "./SignUpForm";
import { invalidEmails } from "../../data/testing";

const mockSignUp = {
  status: "complete",
  create: jest.fn(() => Promise.resolve()),
  prepareEmailAddressVerification: jest.fn(() => Promise.resolve()),
};

jest.mock("@clerk/clerk-react", () => ({
  useSignUp: jest.fn(() => ({ signUp: mockSignUp, isLoaded: true })),
}));

const mockUseSignUp = jest.mocked(require("@clerk/clerk-react").useSignUp);

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));



describe("<SignupForm />", () => {
  beforeEach(() => {
    mockSignUp.status = "complete";
    mockSignUp.create.mockClear();
    mockSignUp.prepareEmailAddressVerification.mockClear();
    mockNavigate.mockClear();
  });

  describe("everything renders properly", () => {
    test("have two input fields(email and password) and 'sign up' button", () => {
      renderComponent();

      expect(getFName()).toBeInTheDocument();
      expect(getLName()).toBeInTheDocument();
      expect(getEmail()).toBeInTheDocument();
      expect(getPassword()).toBeInTheDocument();
      expect(getConfirmPass()).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: /sign up/i })
      ).toBeInTheDocument();
    });

    test("have a link to redirect to the the login page", () => {
      renderComponent();

      const loginLink = screen.getAllByRole("link", { name: /login/i })[0];

      expect(loginLink).toHaveAttribute("href", "/auth/login");
    });
  });

  describe("validation", () => {
    test("display 'this field can't be empty' when any field is empty on blur", () => {
      renderComponent();

      userEvent.click(getEmail());
      userEvent.click(getPassword());

      expect(getEmail()).toHaveAccessibleErrorMessage(/this field can't be empty/i);

      userEvent.click(getFName());
      userEvent.click(getLName());
      userEvent.click(getPassword());
      userEvent.click(getConfirmPass());
      userEvent.click(getEmail());

      expect(getFName()).toHaveAccessibleErrorMessage(/this field can't be empty/i);
      expect(getLName()).toHaveAccessibleErrorMessage(/this field can't be empty/i);
      expect(getPassword()).toHaveAccessibleErrorMessage(/this field can't be empty/i);
      expect(getConfirmPass()).toHaveAccessibleErrorMessage(/this field can't be empty/i);
    });

    test("the error message disappears when typing anything on the field", () => {
      renderComponent();

      // making the error message show at first
      userEvent.click(getFName());
      userEvent.click(getLName());
      userEvent.click(getPassword());
      userEvent.click(getConfirmPass());
      userEvent.click(getEmail());

      expect(getFName()).toHaveAccessibleErrorMessage(/this field can't be empty/i);
      expect(getLName()).toHaveAccessibleErrorMessage(/this field can't be empty/i);
      expect(getPassword()).toHaveAccessibleErrorMessage(/this field can't be empty/i);
      expect(getConfirmPass()).toHaveAccessibleErrorMessage(/this field can't be empty/i);

      // typing anything then clicking away from the element
      userEvent.type(getFName(), "some input");
      userEvent.type(getLName(), "some input");
      userEvent.type(getPassword(), "some input");
      userEvent.type(getConfirmPass(), "some input");
      userEvent.click(getEmail());

      expect(getFName()).toHaveAccessibleErrorMessage("");
      expect(getLName()).toHaveAccessibleErrorMessage("");
      expect(getPassword()).toHaveAccessibleErrorMessage("");
      expect(getConfirmPass()).toHaveAccessibleErrorMessage("");
    });

    describe("testing invalid emails", () => {
      invalidEmails.forEach((email) => {
        test(`display 'please enter a valid email' when submitting ${email} as invalid email`, () => {
          renderComponent();

          userEvent.type(getEmail(), email);

          clickSignup();

          expect(getEmail()).toHaveAccessibleErrorMessage(/please enter a valid email/i);
        });
      });
    });

    test("display 'password must be atleast 8 characters' when submitting short/empty password", () => {
      renderComponent();

      clickSignup();
      expect(getPassword()).toHaveAccessibleErrorMessage(
        /password must be atleast 8 characters/i
      );

      userEvent.type(getPassword(), "shortpw");

      clickSignup();
      expect(getPassword()).toHaveAccessibleErrorMessage(
        /password must be atleast 8 characters/i
      );
    });

    test("display 'this doesn't match the entered password' if the confirm password field doesn't match the password", () => {
      renderComponent();

      userEvent.type(getConfirmPass(), "passwordConfirm");

      clickSignup();
      expect(getConfirmPass()).toHaveAccessibleErrorMessage(
        /this doesn't match the entered password/i
      );
    });

    test("form submits successfully if fields are valid", async () => {
      renderComponent();

      userEvent.type(getFName(), "test");
      userEvent.type(getLName(), "tester");
      userEvent.type(getEmail(), "email@example.com");
      userEvent.type(getPassword(), "password");
      userEvent.type(getConfirmPass(), "password");

      await act(async () => {
        clickSignup();
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
        <Route path="/" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
};

const getFName = () => {
  return screen.getByRole("textbox", { name: /first name/i });
};

const getLName = () => {
  return screen.getByRole("textbox", { name: /last name/i });
};

const getEmail = () => {
  return screen.getByRole("textbox", { name: /email/i });
};

const getPassword = () => {
  return screen.getByLabelText("Password");
};

const getConfirmPass = () => {
  return screen.getByLabelText(/confirm password/i);
};

const clickSignup = () => {
  userEvent.click(screen.getByRole("button", { name: /sign up/i }));
};
