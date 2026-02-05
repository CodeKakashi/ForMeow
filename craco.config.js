const path = require("path");

const appRoot = path.resolve(__dirname, "frontend");
const baseConfig = require("./frontend/craco.config");

const withFrontendPaths = (paths) => {
  const updatedPaths =
    typeof baseConfig.paths === "function" ? baseConfig.paths(paths) : paths;

  updatedPaths.appIndexJs = path.join(appRoot, "src", "index.js");
  updatedPaths.appSrc = path.join(appRoot, "src");
  updatedPaths.appPublic = path.join(appRoot, "public");
  updatedPaths.appHtml = path.join(appRoot, "public", "index.html");
  updatedPaths.appBuild = path.join(appRoot, "build");

  return updatedPaths;
};

module.exports = {
  ...baseConfig,
  paths: withFrontendPaths,
};
