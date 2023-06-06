const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
	content: {type: String, required: true},
	stars: {type: Number , default: 5},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	blog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Blog"
	},
})

commentSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment