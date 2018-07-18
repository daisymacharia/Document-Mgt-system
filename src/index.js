import express from "express";

console.log("the tree rrr");
console.log("the tree rrr");
console.log("the tree rrr");

let router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
	res.json({ message: "hooray! welcome to our api!" });
});

// Register the routes
app.use("/api", router);
