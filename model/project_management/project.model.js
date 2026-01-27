import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        required: true
    },

    startDate: {
        type: String,
        required: true
    },

    endDate: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['working', 'completed'],
        default: 'working'
    }



}, { timestamps: true })


export const Project = mongoose.model('Project', projectSchema)