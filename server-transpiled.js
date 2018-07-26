"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _src = require("./src");

var _src2 = _interopRequireDefault(_src);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require("./webpack.config");

var _webpack4 = _interopRequireDefault(_webpack3);

var _webpackDevServer = require("webpack-dev-server");

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compiler = (0, _webpack2.default)(_webpack4.default);
var app = (0, _express2.default)(); // make instance of express
var options = {
	contentBase: "./dist",
	hot: true,
	host: "localhost"
};

_webpackDevServer2.default.addDevServerEntrypoints(_webpack4.default, options);
var server = new _webpackDevServer2.default(compiler, options);

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// Register the routes
app.use("/test", _src2.default);
app.use("/api", _src2.default);
var port = process.env.PORT || 3000; // set our port

// Start the SERVER
app.listen(port, function () {
	console.log("Magic happens on port http://localhost:" + port);
});
