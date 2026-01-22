import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  }
});

const weekSchema = new mongoose.Schema({
  weekNo: {
    type: Number,
    required: true
  },
  days: {
    type: [daySchema],
    required: true
  }
});

const schedulerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    weeks: {
      type: [weekSchema],
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export const Scheduler = mongoose.model("Scheduler", schedulerSchema);
