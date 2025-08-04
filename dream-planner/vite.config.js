import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    build: {
        outDir: "dist",
        sourcemap: false,
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom"],
                    firebase: ["firebase"],
                    router: ["react-router"]
                }
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
});
