import express from "express";
import bodyParser from "body-parser";
import webpack from "webpack";
import config from "./webpack.config";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const compiler = webpack(config);
// make instance of express
const app = express();

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
	webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	})
);
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
	console.log("hooray! welcome to our api!");
	res.json({ message: "hooray! welcome to our api!" });
});

// Register the routes
app.use("/", router);
let port = process.env.PORT || 8080; // set our port

// Start the SERVER
app.listen(port);
console.log("Magic happens on port " + port);
