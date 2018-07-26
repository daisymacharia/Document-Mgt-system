import users from "../models/users";

//Simple version, without validation or sanitation
export const test = (req, res) => {
	res.send("Greetings from the Test controller!");
};
