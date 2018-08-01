const path = require("path");
const webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");

module.exports = {
	entry: [
		// "webpack-hot-middleware/client?reload=true", //note that it reloads the page if hot module reloading fails.
		path.resolve(__dirname, "src/index")
	],
	// entry: "./src/index.js",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js",
		publicPath: "/" // public URL of the output directory when referenced in a browser
	},
	externals: [nodeExternals()],
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.join(__filename, "src"),
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["env"]
				}
			}
		]
	},
	resolve: {
		// you can now require('file') instead of require('file.js')
		extensions: [".js"]
	},
	target: "node"
};
