import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
      type: Number,
      autoIncrement: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    fullname: {
      type: String,
      required: true,
    },

    officeCode: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
},{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
