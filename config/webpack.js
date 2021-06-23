const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const isProduction = process.env.NODE_ENV == "production" || false

const rootDir = __dirname + "/.."
module.exports = {
    mode: isProduction ? "production" : 'development',

    entry: path.resolve(rootDir, "src/main"),
    target: "node",

    output: {
        path: path.resolve(rootDir, "dist/"),
        filename: "index.js"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: { cacheDirectory: true, cacheCompression: false }
                }
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.node$/,
                use: [
                    {
                        loader: "native-addon-loader",
                        options: { name: "[name]-[hash].[ext]" }
                    }
                ]
            },
        ]
    },
    devtool: "source-map",
    externals: {
        "node-notifier": "require('node-notifier')"
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "node_modules/ecovacs-deebot/key.pem", to: "key.pem" },
            ],
          }),
    ],
};