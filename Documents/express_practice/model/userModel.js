const mongoose = require("mongoose");

const userScehma = mongoose.Schema({
    username : {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add email address"],
        unique : [true, "email address already exists"]
    },
    password:{
        type: String,
        required:[true, "Please add password"],
    },
},{
    timestamps: true,
})

module.exports = mongoose.model("User", userScehma);