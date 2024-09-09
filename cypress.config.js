const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'p939dy',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
