import { Feedback } from '../../model/feedback/feedback.model.js';

export const createFeedback = async (req, res) => {
    try {
        const userId = req.userId
        const { feedback, rating } = req.body;

        if (!feedback || !rating) {
            return res.status(400).json({ message: "Feedback and rating are required" });
        }

        const newFeedback = await Feedback.create({
            feedback,
            rating,
            userId
        })


        res.status(201).json(newFeedback);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating feedback", error });
    }
}

// find feedback

export const getFeedbacks = async (req, res) => {
    try {
        // const userId = req.userId;

        const feedbacks = await Feedback.find().populate('userId', 'username');

        if (!feedbacks) {
            return res.status(404).json({ message: "No feedbacks found for this user" });
        }

        res.status(200).json({ message: "Feedbacks fetched successfully", feedbacks });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching feedbacks", error });
    }
}

// delete feedback

export const deleteFeedback = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const feedbackToDelete = await Feedback.findById(id);
        
        if (!feedbackToDelete) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        if (feedbackToDelete.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this feedback" });

        }

        await Feedback.findByIdAndDelete(id);

        res.status(200).json({ message: "Feedback deleted successfully" });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting feedback", error });
    }
}

