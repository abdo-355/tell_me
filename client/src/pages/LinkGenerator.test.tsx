import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LinkGenerator from "./LinkGenerator";

const mockWindow = window;

jest.mock("../hooks/use-axios.ts", () => () => ({
  request: jest.fn(async () => {
    //@ts-ignore
    mockWindow.requestSent = true;
  }),
  data: { path: "generatedPath" },
}));

describe("<LinkGenerator />", () => {
  it("should render correctly", () => {
    render(<LinkGenerator />);

    //the generate button is rendered
    const getGenButton = screen.getByRole("button", { name: /generate/i });
    expect(getGenButton).toBeInTheDocument();

    //the GeneratedLink component is rendered
    const copyButton = screen.getByRole("button", {
      name: /copy to clipboard/i,
    });
    const linkField = screen.getByRole("textbox");
    expect(copyButton).toBeInTheDocument();
    expect(linkField).toBeInTheDocument();
  });

  it("sends a request to the server when the 'Generate' button is clicked", () => {
    render(<LinkGenerator />);

    const getGenButton = screen.getByRole("button", { name: /generate/i });
    userEvent.click(getGenButton);
    //@ts-ignore
    expect(mockWindow.requestSent).toBeTruthy();
  });

  it("renders the link returned from the server", () => {
    render(<LinkGenerator />);
    const linkField = screen.getByRole("textbox") as HTMLInputElement;

    expect(linkField.value).toBe("http://localhost/messages/generatedPath");
  });
});
