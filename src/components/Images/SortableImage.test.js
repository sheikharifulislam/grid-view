import { useContext } from "react";
import { fireEvent, render, screen } from "utils/test-utils";
import { describe, expect, it } from "vitest";
import SortableImage from "./SortableImage";

const mockSetSelectedImages = vi.fn();
const mockSetImages = vi.fn();
const mockImages = [
    { id: 1, src: "dummy", index: 0 },
    { id: 2, src: "dummy", index: 1 },
    { id: 3, src: "dummy", index: 2 },
    { id: 4, src: "dummy", index: 3 },
    { id: 5, src: "dummy", index: 4 },
];

const initialCtx = {
    images: mockImages,
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

describe("Sortable Image", () => {
    it.each(mockImages)("should render $id number sortable image", (input) => {
        render(<SortableImage image={input} index={input.index} />);
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
    });

    it("should render image overlay and checkbox when hovering root div", () => {
        render(<SortableImage image={mockImages[0]} index={0} />);
        const rootDiv = screen.getByTestId("image");
        fireEvent.mouseEnter(rootDiv);
        const overlay = screen.getByTestId("overlay");
        const checkbox = screen.getByRole("checkbox");
        expect(overlay).toBeInTheDocument();
        expect(checkbox).toBeInTheDocument();
    });
    it("should called imageSelected function when select checkbox", () => {
        render(<SortableImage image={mockImages[0]} index={0} />);
        const rootDiv = screen.getByTestId("image");
        fireEvent.mouseEnter(rootDiv);
        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(mockSetSelectedImages).toHaveBeenCalledWith(new Set([1]));
    });
    it("should visible checkbox and image overlay when image is selected", () => {
        useContext.mockReturnValue({
            ...initialCtx,
            // selected last image for delete
            selectedImages: new Set([5]),
        });
        render(<SortableImage image={mockImages[4]} index={4} />);
        const overlay = screen.getByTestId("overlay");
        const checkbox = screen.getByRole("checkbox");
        expect(overlay).toBeInTheDocument();
        expect(overlay).toHaveClass("overlay-select");
        expect(checkbox).toBeChecked();
    });
});
