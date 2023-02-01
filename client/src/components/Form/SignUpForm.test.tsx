import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";

import SignupForm from "./SignUpForm";
import { invalidEmails } from "../../data/testing";

describe("<SignupForm />", () => {
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

      const loginLink = screen.getByRole("link", { name: /login/i });

      expect(loginLink).toHaveAttribute("href", "/auth/login");
    });
  });

  describe("validation", () => {
    test("display 'this field can't be empty' when any field is empty on blur", () => {
      renderComponent();

      userEvent.click(getEmail());
      userEvent.click(getPassword());

      expect(getEmail()).toHaveErrorMessage(/this field can't be empty/i);

      userEvent.click(getFName());
      userEvent.click(getLName());
      userEvent.click(getPassword());
      userEvent.click(getConfirmPass());
      userEvent.click(getEmail());

      expect(getFName()).toHaveErrorMessage(/this field can't be empty/i);
      expect(getLName()).toHaveErrorMessage(/this field can't be empty/i);
      expect(getPassword()).toHaveErrorMessage(/this field can't be empty/i);
      expect(getConfirmPass()).toHaveErrorMessage(/this field can't be empty/i);
    });

    test("the error message disappears when typing anything on the field", () => {
      renderComponent();

      // making the error message show at first
      userEvent.click(getFName());
      userEvent.click(getLName());
      userEvent.click(getPassword());
      userEvent.click(getConfirmPass());
      userEvent.click(getEmail());

      expect(getFName()).toHaveErrorMessage(/this field can't be empty/i);
      expect(getLName()).toHaveErrorMessage(/this field can't be empty/i);
      expect(getPassword()).toHaveErrorMessage(/this field can't be empty/i);
      expect(getConfirmPass()).toHaveErrorMessage(/this field can't be empty/i);

      // typing anything then clicking away from the element
      userEvent.type(getFName(), "some input");
      userEvent.type(getLName(), "some input");
      userEvent.type(getPassword(), "some input");
      userEvent.type(getConfirmPass(), "some input");
      userEvent.click(getEmail());

      expect(getFName()).toHaveErrorMessage("");
      expect(getLName()).toHaveErrorMessage("");
      expect(getPassword()).toHaveErrorMessage("");
      expect(getConfirmPass()).toHaveErrorMessage("");
    });

    describe("testing invalid emails", () => {
      invalidEmails.forEach((email) => {
        test(`display 'please enter a valid email' when submitting ${email} as invalid email`, () => {
          renderComponent();

          userEvent.type(getEmail(), email);

          clickSignup();

          expect(getEmail()).toHaveErrorMessage(/please enter a valid email/i);
        });
      });
    });

    test("display 'password must be atleast 8 characters' when submitting short/empty password", () => {
      renderComponent();

      clickSignup();
      expect(getPassword()).toHaveErrorMessage(
        /password must be atleast 8 characters/i
      );

      userEvent.type(getPassword(), "shortpw");

      clickSignup();
      expect(getPassword()).toHaveErrorMessage(
        /password must be atleast 8 characters/i
      );
    });

    test("display 'this doesn't match the entered password' if the confirm password field doesn't match the password", () => {
      renderComponent();

      userEvent.type(getConfirmPass(), "passwordConfirm");

      clickSignup();
      expect(getConfirmPass()).toHaveErrorMessage(
        /this doesn't match the entered password/i
      );
    });

    test("form submits successfully if fields are valid", () => {
      const axiosPost = jest.spyOn(axios, "post");
      renderComponent();

      userEvent.type(getFName(), "test");
      userEvent.type(getLName(), "tester");
      userEvent.type(getEmail(), "email@example.com");
      userEvent.type(getPassword(), "password");
      userEvent.type(getConfirmPass(), "password");

      clickSignup();
      expect(axiosPost).toBeCalledTimes(1);
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
