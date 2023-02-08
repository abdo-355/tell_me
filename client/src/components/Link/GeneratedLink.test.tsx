import { render, screen } from "@testing-library/react";

import GeneratedLink from "./GeneratedLink";

describe("<GeneratedLink />", () => {
  it("should render successfully", () => {
    render(<GeneratedLink data={{ path: "" }} />);

    const copyButton = screen.getByRole("button", {
      name: /copy to clipboard/i,
    });

    expect(copyButton).toBeInTheDocument();
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
});

// helper function
const getField = () => {
  return screen.getByRole("textbox") as HTMLInputElement;
};
