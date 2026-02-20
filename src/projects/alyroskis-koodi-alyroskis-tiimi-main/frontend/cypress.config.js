import { defineConfig } from "cypress"
const baseUrl = 'http://localhost:5173/'

export default defineConfig({
  e2e: {
    baseUrl,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});