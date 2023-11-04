import { Container, MantineProvider } from "@mantine/core";
import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

const AllTheProviders = ({ children }) => {
    return (
        <MantineProvider>
            <Container fluid>{children}</Container>
        </MantineProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
