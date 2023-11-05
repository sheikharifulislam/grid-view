import { useContext } from "react";
import { fireEvent, render, screen, userEvent } from "utils/test-utils";
import { describe, expect, it, vi } from "vitest";
import Header from "./Header";

const mockSetSelectedImages = vi.fn();
const mockSetImages = vi.fn();

const initialCtx = {
    images: [
        { id: 1, src: "dummy" },
        { id: 2, src: "dummy" },
        { id: 3, src: "dummy" },
        { id: 4, src: "dummy" },
        { id: 5, src: "dummy" },
    ],
    setImages: mockSetImages,
    selectedImages: new Set(),
    setSelectedImages: mockSetSelectedImages,
};

vi.mock("react", async () => {
    const actual = await vi.importActual("react");
    return {
        ...actual,
        useContext: vi.fn(() => initialCtx),
    };
});

describe("Header", () => {
    it("should render header", () => {
        render(<Header />);
        const input = screen.getByRole("checkbox");
        const deleteBtn = screen.getByRole("button");
        expect(input).toBeInTheDocument();
        expect(deleteBtn).toBeInTheDocument();
    });
    it("should unChecked inputBox initially", () => {
        render(<Header />);
        const input = screen.getByRole("checkbox");
        expect(input).not.toBeChecked();
    });
    it("should checkBox will disabled when the image list is empty", () => {
        useContext.mockReturnValue({
            ...initialCtx,
            // will render an empty image list on the UI
            images: [],
        });
        render(<Header />);
        const input = screen.getByRole("checkbox");
        expect(input).toBeDisabled();
    });
    it("should disabled deleteBtn initially", () => {
        render(<Header />);
        const deleteBtn = screen.getByRole("button");
        expect(deleteBtn).toBeDisabled();
    });
    it("should the delete Button be enabled when selected greater than equal 1 image for delete", () => {
        useContext.mockReturnValue({
            ...initialCtx,
            // selected last image for delete
            selectedImages: new Set([5]),
        });
        render(<Header />);
        const deleteBtn = screen.getByRole("button");
        expect(deleteBtn).not.toBeDisabled();
    });
    it("should selected all images when checkbox is checked", async () => {
        render(<Header />);
        const input = screen.getByRole("checkbox");
        fireEvent.click(input);
        expect(mockSetSelectedImages).toHaveBeenCalledWith(
            new Set([1, 2, 3, 4, 5])
        );
    });
    it("should deleted images when click on the button", async () => {
        useContext.mockReturnValue({
            ...initialCtx,
            // selected first 4 images for delete
            selectedImages: new Set([1, 2, 3, 4]),
        });
        render(<Header />);
        const deleteBtn = screen.getByRole("button");
        await userEvent.click(deleteBtn);
        expect(mockSetImages).toHaveBeenCalledWith([{ id: 5, src: "dummy" }]);
        expect(mockSetSelectedImages).toHaveBeenCalledWith(new Set());
    });
});
