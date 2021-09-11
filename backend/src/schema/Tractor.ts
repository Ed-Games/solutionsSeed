import {model, Schema, Document } from 'mongoose'

const TractorSchema = new Schema({
    id: String,
    name: String,
    image: String,
}, {
    timestamps: true,
})

export default model('Tractor', TractorSchema)


