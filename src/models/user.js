import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    phonenumber: {
        type: Number
    },
    dateOfBirth: {
        type: Date,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    auth: {
        type: String,
        default: 'customer'
    },
    isWatching: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'films'
    }]
}, {
    timestamps: true
})

export default mongoose.model("user", userSchema)