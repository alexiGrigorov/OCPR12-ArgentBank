import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import svgr from "vite-plugin-svgr";
// import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(), svgr(), tailwindcss()],
  plugins: [react()],
  base: "/OCPR12-ArgentBank/",
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
