const CracoAlias = require("craco-alias");
const path = require("path")

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@routes": path.resolve(__dirname, "./src/routes"),
          "@pages": path.resolve(__dirname, "./src/pages"),
          "@components": path.resolve(__dirname, "./src/components"),
          "@config": path.resolve(__dirname, "./src/config"),
          "@constants": path.resolve(__dirname, "./src/constants"),
          "@services": path.resolve(__dirname, "./src/services"),
          "@helpers": path.resolve(__dirname, "./src/helpers"),
        }
      }
    }
  ]
};
