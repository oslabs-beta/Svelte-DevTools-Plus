const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const config = require("../webpack.config");
const path = require("path");
const options = config.chromeExtensionBoilerplate || {};
const excludeEntriesToHotReload = options.notHotReload || [];
require("dotenv").config();

for (const entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] = [
      "webpack/hot/dev-server",
      `webpack-dev-server/client?hot=true&hostname=localhost&port=${process.env.PORT}`,
    ].concat(config.entry[entryName]);
  }
}

delete config.chromeExtensionBoilerplate;

const compiler = webpack(config);

const server = new WebpackDevServer(
  {
    https: false,
    hot: true,
    liveReload: false,
    client: {
      webSocketTransport: "ws",
    },
    webSocketServer: "ws",
    host: "localhost",
    port: process.env.PORT,
    static: {
      directory: path.join(__dirname, "../build"),
    },
    devMiddleware: {
      publicPath: `http://localhost:${process.env.PORT}/`,
      writeToDisk: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    allowedHosts: "all",
  },
  compiler
);

(async () => {
  await server.start();
})();
