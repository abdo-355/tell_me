import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

describe("<App />", () => {
  test("renders the home page for initial load", () => {
    render(<App />, { wrapper: BrowserRouter });
    const homeHeader = screen.getByRole("heading", {
      name: /let them tell you/i,
    });

    expect(homeHeader).toBeInTheDocument();
  });
});
