import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative assets work for both a user/organization Pages site and a
  // repository subpath without hard-coding the future GitHub repository name.
  base: "./",
  plugins: [react()],
});
