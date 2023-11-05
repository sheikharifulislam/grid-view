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
    it("should disabled deleteBtn initially", () => {
        render(<Header />);
        const deleteBtn = screen.getByRole("button");
        expect(deleteBtn).toBeDisabled();
    });
    it("should called setSelectedImages when checkbox is checked", async () => {
        render(<Header />);
        const input = screen.getByRole("checkbox");
        fireEvent.click(input);
        expect(mockSetSelectedImages).toHaveBeenCalled();
    });
    it("should called setImages when click on the button", async () => {
        useContext.mockReturnValue({
            ...initialCtx,
            selectedImages: new Set([1, 2, 3, 4]),
        });
        render(<Header />);
        const deleteBtn = screen.getByRole("button");
        await userEvent.click(deleteBtn);
        expect(mockSetImages).toHaveBeenCalled();
    });
});
