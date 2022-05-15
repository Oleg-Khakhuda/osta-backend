import mongoose from 'mongoose';
import { MIN_QUANTITY, MAX_QUANTITY } from '../lib/constants';
const { Schema, model } = mongoose;

const platesSchema = new Schema({
name: {
    type: String,
    required: [true, 'Set name for contact'],
    },
quantity: {
    type: Number,
    min: MIN_QUANTITY,
    max: MAX_QUANTITY,
    default: null,
},
photo: {
    type: String,
},
price: {
    type: Number,
    },
description: {
    type: String,
},
favorite: [{
    id: Schema.Types.ObjectId,
    addedDate: Date,
    type: Boolean,
    default: false,
}],
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