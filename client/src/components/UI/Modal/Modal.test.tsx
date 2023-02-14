import { useState } from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

import Modal from "./Modal";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

describe("<Modal />", () => {
  afterEach(cleanup);

  it("should not visible initially", async () => {
    renderComponent();

    expect(getModalContent()).not.toBeInTheDocument();
    expect(getModal()).not.toBeInTheDocument();
    expect(getBackdrop()).not.toBeInTheDocument();
  });
  it("should be visible after a modal openning event has occurred", async () => {
    renderComponent();

    act(() => {
      openModal();
    });

    expect(getModalContent()).toBeInTheDocument();
    expect(getModal()).toBeInTheDocument();
    expect(getBackdrop()).toBeInTheDocument();
  });
  it("should be hidden after when clicking on the backdrop", async () => {
    renderComponent();
    act(() => {
      openModal();
    });

    userEvent.click(getBackdrop()!);

    await waitFor(() => {
      expect(getModalContent()).not.toBeInTheDocument();
    });

    expect(getModal()).not.toBeInTheDocument();
    expect(getBackdrop()).not.toBeInTheDocument();
  });
  it("should be hidden after when clicking on the close button", async () => {
    renderComponent();
    act(() => {
      openModal();
    });

    userEvent.click(screen.getByTestId("close-modal"));

    await waitFor(() => {
      expect(getModalContent()).not.toBeInTheDocument();
    });

    expect(getModal()).not.toBeInTheDocument();
    expect(getBackdrop()).not.toBeInTheDocument();
  });
  it("should not be hidden when clicking on the modal body", async () => {
    renderComponent();
    act(() => {
      openModal();
    });

    userEvent.click(getModalContent()!);

    await waitFor(() => {
      expect(getModalContent()).toBeInTheDocument();
    });
    expect(getBackdrop()).toBeInTheDocument();
  });
});

// -------- helper functions -----------------

const TestComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        Hello World
      </Modal>
    </>
  );
};

const renderComponent = () => {
  render(<TestComponent />);
};

const getModalContent = () => {
  return screen.queryByText(/hello world/i);
};

const getModal = () => {
  return screen.queryByTestId("modal");
};

const getBackdrop = () => {
  return screen.queryByTestId("modal-backdrop");
};

const openModal = () => {
  screen.getByText("Open Modal").click();
};
