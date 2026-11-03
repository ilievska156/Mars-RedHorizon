// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      {
        name: "ignore-broken-hmr-sockets",
        configureServer(server) {
          const ignore = (error: { code?: string }) => {
            if (error?.code === "WS_ERR_UNEXPECTED_RSV_1") return;
            console.error(error);
          };
          process.on("uncaughtException", (error: NodeJS.ErrnoException) => {
            if (error?.code === "WS_ERR_UNEXPECTED_RSV_1") return;
            console.error(error);
            process.exit(1);
          });
          server.ws.on("error", ignore);
          server.ws.on("connection", (socket) => {
            socket.on("error", ignore);
          });
        },
      },
    ],
  },
});
