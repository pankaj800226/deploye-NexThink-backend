import { Routine } from '../../model/routen/routen.model.js';
// Create routine
export const createRoutine = async (req, res) => {
    try {
        const userId = req.userId;

        const routine = await Routine.findOne({ userId });

        if (!routine) {
            routine = await Routine.create({
                userId,
                blocks: [],
            });
        }

        res.json(routine);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating routine", error });
    }
}

export const updateRoutine = async (req, res) => {
    try {
        const { blocks } = req.body;

        const routine = await Routine.findOneAndUpdate(
            { userId: req.userId },
            { blocks },
            { new: true, upsert: true }
        );

        res.json(routine);

    } catch (error) {
        res.status(500).json({ message: "Error saving routine" });
    }
};

export const deleteRoutine = async (req, res) => {
    try {

        // const { id } = req.params;
        const userId = req.userId;

        const deletedRoutine = await Routine.findOneAndDelete({ userId });

        if (!deletedRoutine) {
            return res.status(404).json({ message: "Routine not found" });
        }

        res.status(200).json(deletedRoutine);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting routine", error });
    }
}
