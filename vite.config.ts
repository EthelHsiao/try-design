import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server:{
    proxy:{
      "/api": "https://pr-17.core-system.sdc.nycu.club",
    },
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
