import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);

  const API_URL = "https://todo-server-blond.vercel.app";

  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token !== "") {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
      if (location.pathname !== "/register") {
        navigate("/login");
      }
    }
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todos`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const addTodo = async () => {
    if (newTodo) {
      try {
        const response = await axios.post(
          `${API_URL}/api/todos`,
          { title: newTodo },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        getTodos();
        setNewTodo("");
      } catch (err) {
        console.error("Error adding todo:", err);
      }
    }
  };

  const updateTodo = async (id) => {
    if (editedTodo) {
      try {
        const response = await axios.put(
          `${API_URL}/api/todos/${id}`,
          { title: editedTodo },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTodos(response.data);
        setEditTodoId(null);
        setEditedTodo("");
      } catch (err) {
        console.error("Error updating todo:", err);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api//todos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTodos(response.data);
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // useEffect(() => {
  //     deleteTodo();

  // }, []);

  useEffect(() => {
    getTodos();
  }, [token]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        >
          Add
        </button>
      </div>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between bg-gray-800 p-3 rounded-md shadow"
          >
            {editTodoId === todo._id ? (
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                  placeholder="Edit todo"
                  className="w-full px-3 py-1 border rounded-md text-black focus:outline-none"
                />
                <button
                  onClick={() => updateTodo(todo._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between w-full">
                <span className="text-lg">{todo.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditTodoId(todo._id);
                      setEditedTodo(todo.title);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
