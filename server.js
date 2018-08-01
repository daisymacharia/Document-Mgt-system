import express from "express";
import bodyParser from "body-parser";
import router from "./src";
import webpack from "webpack";
import config from "./webpack.config";
import webpackDevServer from "webpack-dev-server";

const compiler = webpack(config);
const app = express();
const options = {
	contentBase: "./dist",
	hot: true,
	host: "localhost"
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register the routes
app.use(`/api/v1/`, router);

let port = process.env.PORT || 3000; // set our port

// Start the SERVER
app.listen(port, () => {
	console.log("Magic happens on port http://localhost:" + port);
});
