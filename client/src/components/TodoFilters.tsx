import React from "react";

interface TodosSort {
  fetchSortedTasks: (byDueDate: string, isTaskCompleted: string) => void;
}
// sorting the task based on their status and dudate
const TodoFilters: React.FC<TodosSort> = ({ fetchSortedTasks }) => {
  return (
    <div className="flex justify-center">
      <select
        className="w-full sm:w-auto bg-slate-900 text-white border-2 border-gray-500 rounded-lg p-3  text-2xl font-semibold"
        onChange={(e) => {
          const value = e.target.value;
          if (value) {
            const [byDueDate, isTaskCompleted] = value.split(",");
            fetchSortedTasks(byDueDate, isTaskCompleted);
          }
        }}
        defaultValue=""
      >
        <option value="" disabled className="text-gray-700 bg-gray-200">
          Select Sorting Option
        </option>
        <option value="asc,">By Earliest Due Date</option>
        <option value="desc,">By Late Due Date</option>
        <option value=",asc">By Incomplete Tasks</option>
        <option value=",desc">By Completed Tasks</option>
      </select>
    </div>
  );
};

export default TodoFilters;
