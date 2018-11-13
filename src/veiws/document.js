import DocSchema from "../models/documents";

export const newDocument = (req, res) => {
	const id = req.user_id;
	const document = new DocSchema();
	const { title, content, access } = req.body;

	document.title = title;
	document.content = content;
	document.ownerId = id;
	if (access) document.access = access;

	document
		.save()
		.then(item => {
			res.status(201).send({
				message: `Document created`
			});
		})
		.catch(error => {
			res.status(400).send(error.errors.title.message);
		});
};

export const getDocument = (req, res) => {
	if (req.params.id) {
		console.log("ID provided");
	} else {
		DocSchema.find().exec((error, docs) => {
			if (docs) {
				res.status(200).send({
					message: `Documents fetched successfully`,
					data: docs
				});
			}
			if (error) return error;
		});
	}
};
