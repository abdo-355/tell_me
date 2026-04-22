import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LinkGenerator from "./LinkGenerator";

const mockWindow = window;
const mockRequest = jest.fn(async () => {
  //@ts-ignore
  mockWindow.requestSent = true;
});

jest.mock("../hooks/use-axios.ts", () => () => ({
  request: mockRequest,
  data: { path: "generatedPath" },
}));

describe("<LinkGenerator />", () => {
  beforeEach(() => {
    //@ts-ignore
    mockWindow.requestSent = undefined;
    mockRequest.mockClear();
  });

  it("should render correctly", () => {
    render(<LinkGenerator />);

    const regenerateButton = screen.getByRole("button", { name: /regenerate/i });
    expect(regenerateButton).toBeInTheDocument();

    //the GeneratedLink component is rendered
    const copyButton = screen.getAllByTestId("copy-button")[0];
    const linkField = screen.getAllByTestId("generated-link")[0];
    expect(copyButton).toBeInTheDocument();
    expect(linkField).toBeInTheDocument();
  });

  it("does not request a new link when one is already available", async () => {
    render(<LinkGenerator />);

    await userEvent.click(screen.getByRole("button", { name: /regenerate/i }));

    expect(mockRequest).not.toHaveBeenCalled();
  });

  it("renders the link returned from the server", () => {
    render(<LinkGenerator />);
    const linkField = screen.getAllByTestId("generated-link")[0] as HTMLInputElement;

    expect(linkField.value).toBe("http://localhost/messages/generatedPath");
  });
});
