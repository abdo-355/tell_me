import { render, screen } from "@testing-library/react";
import Messages from "./Messages";

const mockWindow = window;
let mockedData = jest.fn();

jest.mock("../hooks/use-axios.ts", () => () => ({
  request: () => {
    //@ts-ignore
    mockWindow.requestCalled = true;
  },
  data: mockedData,
}));

describe("<Messages />", () => {
  // it("should send a get request to fetch the messages on initial render", () => {
  //   //@ts-ignore
  //   mockedData = null;
  //   render(<Messages />);

  //   //@ts-ignore
  //   expect(window.requestCalled).toBeTruthy();
  // });

  it("should display 'No messages sent' if there are no messages", () => {
    //@ts-ignore
    mockedData = { messages: [] };
    render(<Messages />);

    expect(screen.getByText(/No messages sent/i)).toBeInTheDocument();
  });

  // it("should display the messages returned from the server successfully", () => {
  //   mockedData = {
  //     //@ts-ignore
  //     messages: ["This is a test message"],
  //   };

  //   render(<Messages />);

  //   expect(screen.queryByText(/No messages sent/i)).not.toBeInTheDocument();
  //   expect(screen.getByText(/This is a test message/i)).toBeInTheDocument();
  // });
});
