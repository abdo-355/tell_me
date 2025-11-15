import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import App from "./App";

jest.mock("@clerk/clerk-react", () => ({
  useAuth: jest.fn(() => ({ isSignedIn: false })),
}));

const mockUseAuth = jest.mocked(useAuth);

describe("<App />", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      isSignedIn: false,
      isLoaded: true,
      userId: null,
      sessionId: null,
      sessionClaims: null,
      actor: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      has: jest.fn(),
      signOut: jest.fn(),
      getToken: jest.fn(),
    });
  });
  test("renders the home page for initial load", () => {
    render(<App />, { wrapper: BrowserRouter });
    const homeHeader = screen.getByRole("heading", {
      name: /let them tell you/i,
    });

    expect(homeHeader).toBeInTheDocument();
  });
});
