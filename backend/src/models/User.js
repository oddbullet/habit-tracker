import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email"],
  },
  password: {
    type: String,
    required: [true, "Password"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
