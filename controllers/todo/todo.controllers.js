import { sendTaskEmail } from "../../emails/taskSendEmail.js";
import { Todo } from "../../model/todo/todo.model.js";
import { User } from "../../model/user/user.model.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description, price, category, priority, status } = req.body;
    const userId = req.userId;

    if (!title || !description || !category || !priority || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const create = await Todo.create({
      title,
      description,
      price,
      category,
      priority,
      status,
      userId,
    });

    if (!create) {
      return res.status(400).json({ message: "task not created" });
    }

    const user = await User.findById(userId);

    if (user?.email) {
      setImmediate(async () => {
        try {
          await sendTaskEmail(
            user.email,
            title,
            description,
            price,
            category,
            priority,
            status
          );
        } catch (error) {
          console.log("Background email error:", err.message);
        }
      });
    }

    res.status(200).json(create);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTask = async (req, res) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = 9
    const skip = (page - 1) * limit

    const total = await Todo.countDocuments({ userId })

    const findTask = await Todo.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    if (findTask.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    

    res.status(200).json({
      message: "task find sucessfully",
      findTask,
      currentPage: page,
      totalPage: Math.ceil(total / limit)
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const taskId = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Todo.findById(id);

    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, priority, status } = req.body;

    const updateTask = await Todo.findByIdAndUpdate(
      id,
      { title, description, price, category, priority, status },
      { new: true }
    );

    if (!updateTask) {
      return res.status(404).json({ message: "task not found" });
    }

    res.status(200).json(updateTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTask = await Todo.findByIdAndDelete(id);

    if (!deleteTask) {
      return res.status(404).json({ message: "task not found" });
    }

    res.status(200).json(deleteTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// export const statusChange = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const taskStatus = await Todo.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!taskStatus) {
//       return res.status(404).json({ message: "task not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "task status change sucessfully", taskStatus });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
