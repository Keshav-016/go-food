const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Please add the users Name"],
        },
        email: {
            type: String,
            required: [true, "Please add the users email"],
        },
        password: {
            type: String,
            required: [true, "Please add the password"],
        },
        date: {
            type: Date,
            default:Date.now ,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user", userSchema);