import react from "@vitejs/plugin-react";
import fs from "fs/promises";
import * as path from "path";
import { defineConfig } from "vite";

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
            utils: path.resolve(__dirname, "./src/util/"),
            components: path.resolve(__dirname, "./src/components/"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/util/test-utils.js",
        coverage: {
            enabled: true,
        },
    },
});
