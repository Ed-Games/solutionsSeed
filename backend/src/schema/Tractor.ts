import {model, Schema} from 'mongoose'

const TractorSchema = new Schema({
    name: {type:String, required:true, unique:true, dropDups:true},
    image: String,
}, {
    timestamps: true,
})

export default model('Tractor', TractorSchema)


