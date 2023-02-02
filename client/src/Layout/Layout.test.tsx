import { render, screen } from "@testing-library/react";
import { Router, Routes, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

import Layout from "./Layout";

const history = createMemoryHistory();

describe("<Layout />", () => {
  test("should redirect to the login page if the passed route is protected and there is no token in the localStorage", () => {
    history.push("/protectedURL");
    renderLayout();

    expect(history.location.pathname).toBe("/auth/login");
  });

  test("should render the home page waithout token", () => {
    history.push("/");

    renderLayout();

    // it doesn't redirect
    expect(history.location.pathname).toBe("/");

    const homePage = screen.getByText("this is the home page");

    expect(homePage).toBeInTheDocument();
  });

  test("should continue to the desired page with the navBar if the passed route is protected and there is a token in the localStorage", () => {
    history.push("/protectedURL");
    localStorage.setItem("token", "aTokenString");
    renderLayout();

    //the url shouldn't change
    expect(history.location.pathname).toBe("/protectedURL");

    const protectedPage = screen.getByText("this should be protected");

    //the protected component is rendered successfully
    expect(protectedPage).toBeInTheDocument();

    //the navBar exists
    const navBar = screen.getByRole("navigation");

    expect(navBar).toBeInTheDocument();
  });
});

// helper functions

const TestComponent = () => <h1>this should be protected</h1>;

const TestHome = () => <h1>this is the home page</h1>;

const renderLayout = () => {
  render(
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TestHome />} />
          <Route path="/protectedURL" element={<TestComponent />} />
        </Route>
      </Routes>
    </Router>
  );
};
