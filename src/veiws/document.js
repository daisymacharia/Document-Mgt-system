import DocSchema from "../models/documents";

export const newDocument = (req, res) => {
	const id = req.user_id;
	const document = new DocSchema();
	const { title, content } = req.body;

	document.title = title;
	document.content = content;
	document.ownerId = id;

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
