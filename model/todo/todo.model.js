import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,

    },

    price: {
      type: Number,
      default: 0
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    priority: {
      type: String,
      required: true,
      index: true,
    },

    status: {
      type: String,
      required: true,
    },

    // status: {
    //   type: String,
    //   enum: ["pending", "completed", "inprogress"],
    //   default: "pending",
    // },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

todoSchema.index({ userId: 1, createdAt: -1 });

// Dashboard filtering (user + status)
todoSchema.index({ userId: 1, status: 1 });

// Category-wise todos per user
todoSchema.index({ userId: 1, category: 1 });


export const Todo = mongoose.model("Todo", todoSchema);
