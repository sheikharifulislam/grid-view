import { render, screen, userEvent } from "utils/test-utils";
import { describe, expect } from "vitest";
import Images from "./Images";

const mockSetSelectedImages = vi.fn();
const mockSetImages = vi.fn((fn) => {
    fn([]);
});

const initialCtx = {
    images: [],
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

vi.mock("@mantine/dropzone", async () => {
    const actual = await vi.importActual("@mantine/dropzone");
    return {
        ...actual,
        Dropzone: ({ onDrop }) => {
            return (
                <input
                    type="file"
                    multiple={true}
                    data-testid="dropzone"
                    onChange={(e) => onDrop([e.target.files])}
                />
            );
        },
    };
});

describe("Images", () => {
    it("should upload images properly", async () => {
        render(<Images />);
        const fileInput = screen.getByTestId("dropzone");
        const files = [
            new File(["image1 "], "foo.jpg", { type: "image/jpg" }),
            new File(["image1 "], "too.png", { type: "image/png" }),
        ];

        await userEvent.upload(fileInput, files);
        expect(mockSetImages).toHaveBeenCalled();
    });
});
