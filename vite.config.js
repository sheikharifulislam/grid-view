import react from "@vitejs/plugin-react";
import fs from "fs/promises";
import * as path from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        eslint({
            include: ["./src}/**/*.{ts,tsx,js,jsx}"],
            cache: true,
        }),
    ],
    esbuild: {
        loader: "jsx",
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: "load-js-files-as-jsx",
                    setup(build) {
                        build.onLoad(
                            { filter: /src\/.*\.js$/ },
                            async (args) => ({
                                loader: "jsx",
                                contents: await fs.readFile(args.path, "utf8"),
                            })
                        );
                    },
                },
            ],
        },
    },
    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            src: path.resolve(__dirname, "./src"),
            utils: path.resolve(__dirname, "./src/utils/"),
            components: path.resolve(__dirname, "./src/components/"),
            data: path.resolve(__dirname, "./src/data/"),
            hooks: path.resolve(__dirname, "./src/hooks/"),
            contexts: path.resolve(__dirname, "./src/contexts/"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/utils/test-utils.js",
        reporters: ["default", "html"],
        coverage: {
            enabled: true,
        },
    },
});
