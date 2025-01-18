import React from "react";
import { useSearchParams } from "react-router-dom";

interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted?: boolean;
}

interface TodoItemsProps {
  tasks: Task[];
  handleTaskStatus: (id: string) => void;
  handleEditTask: (taskId: string) => void;
  deleteTask: (id: string) => void;
}

const TodoItems: React.FC<TodoItemsProps> = ({
  tasks,
  handleTaskStatus,
  handleEditTask,
  deleteTask,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter");
  // filtering task based on thier status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "incomplete") return !task.isCompleted;
    return true;
  });
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Todos
      </h1>

      <div className="flex justify-center mb-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-900 text-white rounded-md mx-2"
          onClick={() => setSearchParams({})}
        >
          Show All Tasks
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-900 text-white rounded-md mx-2"
          onClick={() => setSearchParams({ filter: "completed" })}
        >
          Show Completed Tasks
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-900 text-white rounded-md mx-2"
          onClick={() => setSearchParams({ filter: "incomplete" })}
        >
          Show Incomplete Tasks
        </button>
      </div>
      <div className="overflow-y-auto">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-3 font-semibold text-gray-600 text-center">
              Work Done
            </th>
            <th className="p-3 font-semibold text-gray-600 text-center">
              Title
            </th>
            <th className="p-3 font-semibold text-gray-600 text-center">
              Description
            </th>
            <th className="p-3 font-semibold text-gray-600 text-center">
              Due Date-Time
            </th>
            <th className="p-3 font-semibold text-gray-600 text-center">
              Update
            </th>
            <th className="p-3 font-semibold text-gray-600 text-center">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr
                key={task._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onClick={() => handleTaskStatus(task._id!)}
                    readOnly
                  />
                </td>
                <td
                  className={`p-3 text-center ${
                    task.isCompleted
                      ? "line-through text-rose-500"
                      : "text-black"
                  }`}
                >
                  {task.title}
                </td>
                <td
                  className={`p-3 text-center ${
                    task.isCompleted
                      ? "line-through text-rose-500"
                      : "text-black"
                  }`}
                >
                  {task.description}
                </td>
                <td
                  className={`p-3 text-center ${
                    task.isCompleted
                      ? "line-through text-rose-500"
                      : "text-black"
                  }`}
                >
                  {new Date(task.dueDate).toLocaleString("en-GB")}
                </td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-900 text-white rounded-md"
                    onClick={() => handleEditTask(task._id!)}
                  >
                    Update
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                    onClick={() => deleteTask(task._id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="p-3 text-center text-gray-600 font-semibold"
              >
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TodoItems;
