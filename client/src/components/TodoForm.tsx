import React from "react";

interface TodoFormProps {
  isEditing: boolean;
  task: { title: string; description: string; dueDate: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}
// todo task form
const TodoForm: React.FC<TodoFormProps> = ({
  isEditing,
  task,
  handleInputChange,
  handleFormSubmit,
}) => {
  return (
    <div className="mx-auto max-w-screen-xl py-[4rem] px-[2.4rem]">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-black text-3xl font-bold text-center mb-6">
          {isEditing ? "Update Task" : "Add Task"}
        </h1>
        <form className="grid grid-flow-row gap-6" onSubmit={handleFormSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-black text-lg font-medium"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={task.title}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-100 border text-black border-blue-400 rounded-lg py-2 px-3"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-black text-lg font-medium"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={task.description}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-100 border text-black border-blue-400 rounded-lg py-2 px-3"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="dueDate"
              className="text-black text-lg font-medium"
            >
              Due Date
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              placeholder="Due Date"
              value={task.dueDate}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-100 border text-black border-blue-400 rounded-lg py-2 px-3"
            />
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-800 py-3 px-6 rounded-md text-white font-semibold"
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
