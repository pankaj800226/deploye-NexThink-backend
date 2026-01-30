import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    feedback:{
        type: String,
        required: true
    },

    rating:{
        type: Number,
        required: true
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
})

export const Feedback = mongoose.model('Feedback', feedbackSchema);