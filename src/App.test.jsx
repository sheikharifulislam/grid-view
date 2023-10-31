import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import App from "./App";

describe("app text", () => {
    it("should render app", () => {
        render(<App />);
        const item = screen.getByText(
            "Click on the Vite and React logos to learn more"
        );
        expect(item).toBeInTheDocument();
    });
});
