"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require("./webpack.config");

var _webpack4 = _interopRequireDefault(_webpack3);

var _webpackDevMiddleware = require("webpack-dev-middleware");

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require("webpack-hot-middleware");

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compiler = (0, _webpack2.default)(_webpack4.default);
// make instance of express
var app = (0, _express2.default)();

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use((0, _webpackDevMiddleware2.default)(compiler, {
	noInfo: true,
	publicPath: _webpack4.default.output.publicPath
}));
app.use((0, _webpackHotMiddleware2.default)(compiler));

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
var router = _express2.default.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function (req, res) {
	console.log("hooray! welcome to our api!");
	res.json({ message: "hooray! welcome to our api!" });
});

// Register the routes
app.use("/", router);
var port = process.env.PORT || 8080; // set our port

// Start the SERVER
app.listen(port);
console.log("Magic happens on port " + port);
