import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
    return {
        server: {
            host: "localhost",
            port: 5173,
        },
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "@": path.resolve(__dirname, "./src"),
            },
        },
    };
});
