import mongoose from "mongoose";

const filmsSchema = new mongoose.Schema({
    filmName: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    decs: {
        type: String,
        required: true
    },
    actors: [{
        type: String
    }],
    acceptAge: {
        type: Number
    },
    category: [{
        type: String
    }],
    genres: [{
        type: String
    }],
    episodes: {
        type: Number
    }
},
    { timestamps: true })

export default mongoose.model("films", filmsSchema)