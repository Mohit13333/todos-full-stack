import React from "react";
import TodoItems from "./TodoItems";

interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted?: boolean;
}

interface Props {
  tasks: Task[];
  handleTaskStatus: (id: string) => void;
  handleEditTask: (taskId: string) => void;
  deleteTask: (id: string) => void;
}

const TodoList: React.FC<Props> = ({ tasks, handleTaskStatus, handleEditTask, deleteTask }) => {
  return (
    <div>
      <TodoItems
        tasks={tasks}
        handleTaskStatus={handleTaskStatus}
        handleEditTask={handleEditTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TodoList;
