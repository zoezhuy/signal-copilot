import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // This repository is published at zoezhuy.github.io/signal-copilot/.
  // An explicit base keeps module and stylesheet URLs correct on GitHub Pages.
  base: "/signal-copilot/",
  plugins: [react()],
});
