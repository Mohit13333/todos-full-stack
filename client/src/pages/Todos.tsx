import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/NavBar";
import TodoForm from "../components/TodoForm";
import TodoFilters from "../components/TodoFilters";
import TodoItems from "../components/TodoItems";

interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted?: boolean;
}
const Todos: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    dueDate: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const { userAuthToken, isLoggedIn } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };
  // Fetching todos data
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo/getTodos`,
        {
          headers: {
            Authorization: userAuthToken,
          },
        }
      );
      setTasks(response.data.todosData || []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add or update task based on the opretion
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint =
        isEditing && editTaskId
          ? `${
              import.meta.env.VITE_BACKEND_URI
            }/api/todo/updateTodos/${editTaskId}`
          : `${import.meta.env.VITE_BACKEND_URI}/api/todo/post`;

      const method = isEditing ? "put" : "post";
      const response = await axios[method](endpoint, task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: userAuthToken,
        },
      });

      toast.success(response.data.message);
      setIsEditing(false);
      setEditTaskId(null);
      setTask({ title: "", description: "", dueDate: "" });
      fetchTodos();
    } catch (error: any) {
      // console.log(error)
      toast.error(error?.response?.data?.message);
    }
  };
  const handleEditTask = (taskId: string) => {
    // find the task that matches the provided task id
    const selectedTask = tasks.find((todo) => todo._id === taskId);
    // it set the task detail for editing
    if (selectedTask) {
      setTask({
        title: selectedTask.title,
        description: selectedTask.description,
        dueDate: selectedTask.dueDate.split("T")[0],
      });
      setEditTaskId(taskId);
      setIsEditing(true);
    }
  };
  // task deletion
  const deleteTask = async (id: string) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo/deleteTodos/${id}`,
        {
          headers: {
            Authorization: userAuthToken,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
      fetchTodos();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  // hadling task completion status
  const handleTaskStatus = async (id: string) => {
    try {
      const response = await axios.put(
        ` ${import.meta.env.VITE_BACKEND_URI}/api/todo/toggleCheck/${id}`,
        {},
        {
          headers: {
            Authorization: userAuthToken,
          },
        }
      );
      toast.success(response.data.message);
      fetchTodos();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  // Fetching sorted tasks
  const fetchSortedTasks = async (
    byDueDate: string,
    isTaskCompleted: string
  ) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/todo/getSortedTodos`,
        {
          params: { byDueDate, isTaskCompleted },
          headers: {
            Authorization: userAuthToken,
          },
        }
      );
      setTasks(response.data.todos || []);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(`${now.toDateString()} - ${now.toLocaleTimeString()}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      {isLoggedIn ? (
        <div className="flex flex-col min-h-screen text-gray-100">
          <header className="p-6">
            <h1 className="font-bold mt-20 text-center text-4xl sm:text-5xl">
              Todo List
            </h1>
          </header>
          <h2 className="mt-4 font-semibold text-center text-xl sm:text-2xl">
            {dateTime}
          </h2>
          <TodoForm
            isEditing={isEditing}
            task={task}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
          <TodoFilters fetchSortedTasks={fetchSortedTasks} />
          <TodoItems
            tasks={tasks}
            handleTaskStatus={handleTaskStatus}
            handleEditTask={handleEditTask}
            deleteTask={deleteTask}
          />
          <Footer />
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default Todos;
