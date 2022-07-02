import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const photoSchema = new Schema({
    photo: {
        type: String,
    },
});

const Photo = model('photo', photoSchema)

export default Photo