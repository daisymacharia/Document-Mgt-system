import mongoose from "mongoose";

let Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: { type: String, required: true, max: 100 }
});

// Export the model
export default mongoose.model("User", UserSchema);
