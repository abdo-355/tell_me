import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GeneratedLink from "./GeneratedLink";

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn((str: string) => {}),
  },
});

describe("<GeneratedLink />", () => {
  it("should render successfully", () => {
    render(<GeneratedLink data={{ path: "" }} />);

    expect(getButton()).toBeInTheDocument();
    expect(getField()).toBeInTheDocument();
  });

  it("should display the placeholder when there is no path sent by the parent(the value should be an empty string)", () => {
    //@ts-ignore
    render(<GeneratedLink />);

    expect(getField().value).toBe("");
  });

  it("should display the path sent by the parent successfully", () => {
    render(<GeneratedLink data={{ path: "generatedPath" }} />);

    expect(getField().value).toBe("http://localhost/messages/generatedPath");
  });

  it("should copy the url to the clipboard when clicking the copy button", () => {
    render(<GeneratedLink data={{ path: "generatedPath" }} />);

    userEvent.click(getButton());

    expect(navigator.clipboard.writeText).toBeCalledWith(
      "http://localhost/messages/generatedPath"
    );
  });
});

// helper functions

const getField = () => {
  return screen.getByRole("textbox") as HTMLInputElement;
};

const getButton = () => {
  return screen.getByRole("button", { name: /copy to clipboard/i });
};
