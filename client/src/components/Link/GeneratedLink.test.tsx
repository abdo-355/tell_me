import { render, screen, act } from "@testing-library/react";

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

  it("should copy the url to the clipboard when clicking the copy button", async () => {
    render(<GeneratedLink data={{ path: "generatedPath" }} />);

    await act(async () => {
      getButton().click();
    });

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
