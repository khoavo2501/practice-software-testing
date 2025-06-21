const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Tạo task để đọc file CSV
      on('task', {
        readCsvFile(filename) {
          const filePath = path.resolve('cypress', 'fixtures', filename);
          const csvContent = fs.readFileSync(filePath, 'utf8');
          const result = Papa.parse(csvContent, {
            header: true,
            skipEmptyLines: true
          });
          return result.data;
        }
      });
    },
  },
  video: true,
});
