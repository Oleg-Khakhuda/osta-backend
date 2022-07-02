import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const platesSchema = new Schema({
name: {
    type: String,
    // required: [true, 'Set name for plate'],
    },
quantity: {
    type: Number,
    default: null,
},
price: {
    type: Number,
    },
description: {
    type: String,
    },
plateImage: {
    type: String,
    default: null,
},
// favorite: [{
//     id: Schema.Types.ObjectId,
//     addedDate: Date,
//     type: Boolean,
//     default: false,
// }],
}, {
    versionKey: false,
    timestamps: true,
    toJSON: {
        virtuals: true, transform: function (doc, ret) {
            delete ret._id
            return ret
    } },
    toObject: { virtuals: true }
}
);

platesSchema.virtual('status').get(function () {
    if (this.quantity <= 100) {
        return 'Закінчення товару';
    }
    return 'Є в наявності';
})

const Plates = model('plates', platesSchema)

export default Plates