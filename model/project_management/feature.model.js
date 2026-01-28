import monggose from 'mongoose'

const featureSchema = new monggose.Schema({
    projectId: {
        type: monggose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    userId:{
        type: monggose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    title:{
        type:String,
        required:true
    },

    status:{
        type:String,
        required:true
    },

},{timestamps:true})

export const Feature = monggose.model('ProjectFeature',featureSchema)