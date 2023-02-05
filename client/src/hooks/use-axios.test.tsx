import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import useAxios from "./use-axios";

const ReqURL = "https://jsonplaceholder.typicode.com/posts/1";
const postReqURL = "https://jsonplaceholder.typicode.com/posts";

describe("useAxios", () => {
  afterEach(cleanup);

  it("should return an initial state of loading false and data null with the correct status code", () => {
    const TestComponent = () => {
      const { request, loading, data, statusCode } = useAxios(ReqURL, "get");

      useEffect(() => {
        request();
      });

      return (
        <>
          <span data-testid="loading">{loading ? "true" : "false"}</span>
          <span data-testid="data">{data}</span>
          <span data-testid="statusCode">{statusCode}</span>
        </>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId("loading")).toHaveTextContent("true");
    expect(screen.getByTestId("data")).toHaveTextContent("");
    expect(screen.getByTestId("statusCode")).toHaveTextContent("0");
  });

  it("should update the initial state to the correct data (get request)", async () => {
    const TestComponent = () => {
      const { request, loading, data, statusCode } = useAxios(ReqURL, "get");

      useEffect(() => {
        request();
      });

      return (
        <>
          {loading && <span data-testid="loading">loading is true</span>}
          {data && <span data-testid="data">{data.id}</span>}
          {statusCode && <span data-testid="statusCode">{statusCode}</span>}
        </>
      );
    };

    render(<TestComponent />);

    expect(await screen.findByTestId("loading")).toHaveTextContent(
      "loading is true"
    );

    const statusCode = (await screen.findByTestId("statusCode")).textContent;

    expect(statusCode).toBe("200");

    expect(await screen.findByTestId("data")).toHaveTextContent("1");
  });

  it("should send post request and return correct data", async () => {
    const TestComponent = () => {
      const { request, data, statusCode } = useAxios(postReqURL, "post", {
        title: "test",
        body: "testing",
        userId: 1,
      });

      return (
        <>
          <button onClick={() => request()} data-testid="submitButton">
            Click
          </button>
          {data && <span data-testid="data">{data.id}</span>}
          {statusCode && <span data-testid="statusCode">{statusCode}</span>}
        </>
      );
    };

    render(<TestComponent />);

    userEvent.click(screen.getByTestId("submitButton"));

    const idText = (await screen.findByTestId("data")).textContent;

    expect(idText).toBe("101");
    expect(await screen.findByTestId("statusCode")).toHaveTextContent("201");
  });

  it("should send put request and return correct data", async () => {
    const TestComponent = () => {
      const { request, data, statusCode } = useAxios(ReqURL, "put", {
        title: "test",
        body: "testing",
        userId: 1,
        id: 1,
      });
      return (
        <>
          <button onClick={() => request()} data-testid="submitButton"></button>
          {data && (
            <>
              <span data-testid="dataId">{data.id}</span>
              <span data-testid="dataTitle">{`${data.title} ${data.body}`}</span>
            </>
          )}
          {statusCode && <span data-testid="statusCode">{statusCode}</span>}
        </>
      );
    };

    render(<TestComponent />);

    userEvent.click(screen.getByTestId("submitButton"));

    const idText = (await screen.findByTestId("dataId")).textContent;
    const titleText = (await screen.findByTestId("dataTitle")).textContent;
    const statusCodeText = (await screen.findByTestId("statusCode"))
      .textContent;

    expect(idText).toBe("1");
    expect(titleText).toBe("test testing");
    expect(statusCodeText).toBe("200");
  });

  it("should send patch request and return correct data", async () => {
    const TestComponent = () => {
      const { request, data, statusCode } = useAxios(ReqURL, "patch", {
        title: "test",
      });

      return (
        <>
          <button onClick={() => request()} data-testid="submitButton"></button>
          {data && <span data-testid="data">{data.title}</span>}
          {statusCode && <span data-testid="statusCode">{statusCode}</span>}
        </>
      );
    };

    render(<TestComponent />);

    userEvent.click(screen.getByTestId("submitButton"));

    const titleText = (await screen.findByTestId("data")).textContent;
    const statusCodeText = (await screen.findByTestId("statusCode"))
      .textContent;

    expect(titleText).toBe("test");
    expect(statusCodeText).toBe("200");
  });

  it("should send delete request and return correct data", async () => {
    const TestComponent = () => {
      const { request, statusCode } = useAxios(ReqURL, "delete");

      return (
        <>
          <button onClick={() => request()} data-testid="submitButton"></button>
          {statusCode && <span data-testid="statusCode">{statusCode}</span>}
        </>
      );
    };

    render(<TestComponent />);

    userEvent.click(screen.getByTestId("submitButton"));

    const statusCodeText = (await screen.findByTestId("statusCode"))
      .textContent;

    expect(statusCodeText).toBe("200");
  });
});
