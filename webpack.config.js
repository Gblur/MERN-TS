import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
const __dirname = path.dirname(".");
import webpack from "webpack";
import dotenv from "dotenv";
dotenv.config();

export default function (env, argv) {
  const config = {
    devtool: false,
    entry: "./client/src/index.tsx",
    output: {
      path: path.resolve(__dirname, "./client/dist"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader",
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./client/src", "index.html"),
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
    performance: {},
  };

  if (argv.mode === "development") {
    config.devtool = "source-map";
    console.log("Development Mode is running...");
  }
  if (argv.mode === "production") {
    config.devtool = false;
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };
    console.log("Production Mode is running...");
  }

  return config;
}
