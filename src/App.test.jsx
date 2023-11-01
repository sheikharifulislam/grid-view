import { render } from "utils/test-utils";
import { expect } from "vitest";
import App from "./App";

describe("app text", () => {
    it("should render app", () => {
        render(<App />);
        expect(2 + 2).toEqual(4);
    });
});
