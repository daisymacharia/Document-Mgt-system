import UserSchema from "../models/users";
import generate_token from "../helpers/generate_token";

class User {
	constructor(id, name, username, email, password) {
		(this.id = id),
			(this.name = name),
			(this.username = username),
			(this.email = email),
			(this.password = email);
	}

	/**
	 * loginUser - log in existing user
	 *
	 * @param  {type} req - the request
	 * @param  {type} res - the response
	 * @return {string}     error or success message
	 */
	loginUser(req, res) {
		const { username, password } = req.body;

		UserSchema.findOne({
			username
		}).exec((err, user) => {
			if (err)
				res.status(400).send({
					message: "An error occured"
				});
			else if (user) {
				if (user.password == password) {
					var token = generate_token(username, user._id, user.role);
					res.status(200).send({
						message: "user login successful",
						token: token
					});
				} else {
					res.status(400).send({
						message: "Wrong password"
					});
				}
			} else
				res.status(400).send({
					message: "username is not registered"
				});
		});
	}

	/**
	 * createUser - register new user
	 *
	 * @param  {type} req - the request
	 * @param  {type} res - the response
	 * @return {string}     error or success message
	 */
	createUser(req, res) {
		const user = new UserSchema();
		const {
			name: { first_name, last_name },
			username,
			email,
			password,
			role
		} = req.body;

		UserSchema.findOne({
			$or: [
				{
					username
				},
				{
					email
				}
			]
		}).exec((err, existing_user) => {
			if (err)
				res.status(400).send({
					message: "An error occured"
				});
			else if (existing_user) {
				res.status(400).send({
					message: `user ${username} already exists`
				});
			} else
				user.name = {
					first_name,
					last_name
				};
			user.username = username;
			user.password = password;
			user.email = email;
			if (role) {
				user.role = role;
			}

			user
				.save()
				.then(item => {
					var token = generate_token(username, item._id, user.role);

					res.status(200).send({
						message: `Account for ${username} created`,
						token: token
					});
				})
				.catch(err => {
					res.status(400).send(err.message);
				});
		});
	}

	/**
	 * getUsers - fetch users in the database
	 *
	 * @param  {type} req - the request
	 * @param  {type} res - the response
	 * @return {array}     error or users
	 */
	getUsers(req, res) {
		if (req.params.id) {
			let id = req.params.id;
			if (req.user_id == id || req.role == "admin") {
				UserSchema.findById(id).exec((error, user) => {
					if (error)
						res.status(400).send({
							message: "An error occured"
						});
					else if (user) {
						res.status(200).send({
							message: `User fetched successfully`,
							data: user
						});
					}
				});
			} else
				return res.status(403).send({
					message: "Not authorized to access the method"
				});
		} else if (req.role == "admin") {
			UserSchema.find().exec((err, users) => {
				if (err)
					res.status(400).send({
						message: "An error occured"
					});
				else if (users) {
					res.status(200).send({
						message: `Users fetched successfully`,
						data: users
					});
				}
			});
		} else
			return res.status(403).send({
				message: "Only admins have access to this method"
			});
	}

	updateUser(req, res) {
		const user = new UserSchema();
		let id = req.params.id;
		const { role } = req.body;

		UserSchema.findById(id).exec((error, user) => {
			if (user) {
				if (req.user_id == id) {
					if (role) {
						return res.status(403).send({
							message: "User not allowed to modify a role"
						});
					} else {
						UserSchema.findByIdAndUpdate(id, req.body).exec((error, user) => {
							if (error)
								res.status(400).send({
									message: "An error occured"
								});
							else if (!error)
								res.status(200).send({
									message: "user data updated"
								});
						});
					}
				} else if (req.role == "admin") {
					UserSchema.findByIdAndUpdate(id, req.body).exec((error, user) => {
						if (error)
							res.status(400).send({
								message: "An error occured"
							});
						else if (user)
							res.status(200).send({
								message: "user upgraded to admin"
							});
					});
				} else {
					return res.status(403).send({
						message: "not authorised"
					});
				}
			} else if (error)
				res.status(400).send({
					message: "An error occured"
				});
			else
				res.status(404).send({
					message: "user not found"
				});
		});
	}
}

export default User;
