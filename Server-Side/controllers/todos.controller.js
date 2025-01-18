import Todo from "../models/tododata.model.js";

// create Todo
const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user._id;

    const newTodo = new Todo({
      title,
      description,
      dueDate,
      owner: userId,
    });

    await newTodo.save();
    return res.status(200).json({ message: "Task added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get all todos
const getTodos = async (req, res) => {
  try {
    const userId = req.user._id;

    const todosData = await Todo.find({ owner: userId });

    if (!todosData || todosData.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }

    return res.status(200).json({ todosData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete todo by todo id and user id
const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    if (!id) {
      return res.status(400).json({ message: "Todo id is required" });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this todo" });
    }

    await Todo.deleteOne({ _id: id });
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update todo by user id and todo id
const updateTodos = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const data = req.body;
    const todo = await Todo.findById(id);
    if (data.dueDate && new Date(data.dueDate) < new Date()) {
      return res
        .status(400)
        .json({ message: "Please Select future date and time" });
    }
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this todo" });
    }

    await Todo.updateOne({ _id: id }, { $set: data });
    return res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// mark todo complete or in complete based on todo id and user id
const todoStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to toggle this todo" });
    }

    todo.isCompleted = !todo.isCompleted;
    const updatedTodo = await todo.save();

    return res.status(200).json({
      message: `Task ${todo.isCompleted ? "completed" : "incomplete"}`,
      todo: updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// sort todo by due date or status
const getSortedTodos = async (req, res) => {
  const { byDueDate, isTaskCompleted } = req.query;
  const userId = req.user._id;

  try {
    if (!byDueDate && !isTaskCompleted) {
      return res.status(400).json({
        message:
          "At least one sorting parameter is required.",
      });
    }

    const sortCriteria = {};
    if (byDueDate) sortCriteria.dueDate = byDueDate === "desc" ? -1 : 1;
    if (isTaskCompleted)
      sortCriteria.isCompleted = isTaskCompleted === "desc" ? -1 : 1;

    const todos = await Todo.find({ owner: userId }).sort(sortCriteria);

    if (todos.length === 0) {
      return res.status(404).json({ message: "No Todos Found" });
    }

    res.status(200).json({
      message: "Tasks retrieved successfully",
      todos,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodos,
  todoStatus,
  getSortedTodos,
};
