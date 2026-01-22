import mongoose from 'mongoose'

const coverImgSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    coverPhoto: {
        type: String,
        required: true,
    },
    
}, { timestamps: true })

export const CoverPhoto = mongoose.model('CoverPhoto', coverImgSchema)