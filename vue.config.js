const path = require("path");

// vue.config.js
module.exports = {
  runtimeCompiler: true,
  outputDir: path.resolve(__dirname, "../iot-backend/src/public"),
};