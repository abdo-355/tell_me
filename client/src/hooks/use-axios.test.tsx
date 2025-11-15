import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import useAxios from "./use-axios";

jest.mock("@clerk/clerk-react", () => ({
  useAuth: jest.fn(() => ({ getToken: jest.fn(() => Promise.resolve("token")) })),
}));

const mockUseAuth = jest.mocked(useAuth);

describe("useAxios", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      userId: "user123",
      sessionId: "session123",
      sessionClaims: {} as any,
      actor: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      has: jest.fn(),
      signOut: jest.fn(),
      getToken: jest.fn(() => Promise.resolve("token")),
    });
  });

  it("should return an initial state of loading false and data null with the correct status code", () => {
    jest
      .spyOn(axios, "request")
      .mockImplementationOnce((obj) => Promise.resolve({}));

    const TestComponent = () => {
      const { loading, data, statusCode } = useAxios("", "get");

      return (
        <>
          <span data-testid="loading">{loading ? "true" : "false"}</span>
          <span data-testid="data">{data}</span>
          <span data-testid="statusCode">{statusCode}</span>
        </>
      );
    };

    render(<BrowserRouter>
      <Routes>
        <Route path="/" element={<TestComponent />} />
      </Routes>
    </BrowserRouter>
    );

    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("data").textContent).toBe("");
    expect(screen.getByTestId("statusCode").textContent).toBe("0");
  });

  it("should update the initial state to the correct data (get request)", async () => {
    jest
      .spyOn(axios, "request")
      .mockImplementationOnce((obj) =>
        Promise.resolve({ data: { test: "test" }, status: 200 })
      );

    const TestComponent = () => {
      const { request, loading, data, statusCode } = useAxios("", "get");

      return (<>
        <button onClick={() => request()} data-testid="submitButton">
          Click
        </button>
        {loading && <span data-testid="loading">loading is true</span>}
        {data && <span data-testid="data">{data.test}</span>}
        {statusCode && <span data-testid="statusCode">{statusCode}</span>}
      </>
      );
    };

    render(<BrowserRouter>
      <Routes>
        <Route path="/" element={<TestComponent />} />
      </Routes>
    </BrowserRouter>
    );

    userEvent.click(screen.getByTestId("submitButton"));

    expect(await screen.findByTestId("loading")).toHaveTextContent(
      "loading is true"
    );

    const statusCode = (await screen.findByTestId("statusCode")).textContent;

    expect(statusCode).toBe("200");

    expect(await screen.findByTestId("data")).toHaveTextContent("test");
  });

  it("should send and request that requires a body and return correct data", async () => {
    jest
      .spyOn(axios, "request")
      .mockImplementationOnce((obj) =>
        Promise.resolve({ data: { test: "test" }, status: 201 })
      );

    const TestComponent = () => {
      const { request, data, statusCode } = useAxios("", "post", {
        title: "title for dummy body",
      });

      return (
        <>
          <button onClick={() => request()} data-testid="submitButton">
            Click
          </button>
          {data && <span data-testid="data">{data.test}</span>}
          {statusCode && <span data-testid="statusCode">{statusCode}</span>}
        </>
      );
    };

    render(<BrowserRouter>
      <Routes>
        <Route path="/" element={<TestComponent />} />
      </Routes>
    </BrowserRouter>
    );

    userEvent.click(screen.getByTestId("submitButton"));

    const dataText = (await screen.findByTestId("data")).textContent;

    expect(dataText).toBe("test");
    expect(await screen.findByTestId("statusCode")).toHaveTextContent("201");
  });
});
