const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js",
		publicPath: "/" // public URL of the output directory when referenced in a browser
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.join(__filename, "src"),
				// exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["env"]
				}
			}
		]
	},
	resolve: {
		// you can now require('file') instead of require('file.coffee')
		extensions: [".js"]
	},
	target: "node"
};
