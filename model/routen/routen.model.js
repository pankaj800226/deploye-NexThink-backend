import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
    id: Number,
    type: {
        type: String,
        enum: ["heading", "check", "note", "divider"],
        required: true,
    },
    text: String,
    done: Boolean,
});

const RoutineSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, 
        },
        blocks: [BlockSchema],
    },
    { timestamps: true }
);

export const Routine = mongoose.model("Routine", RoutineSchema);
