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
        assetsInlineLimit: 4096, // 4kb
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom"],
                    firebase: ["firebase"],
                    router: ["react-router"]
                },
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.');
                    const ext = info[info.length - 1];
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
                        return `assets/images/[name]-[hash][extname]`;
                    }
                    return `assets/[name]-[hash][extname]`;
                }
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
});
