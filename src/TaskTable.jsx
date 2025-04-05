import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TaskTable.css";
import { deleteTask } from "./Redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import { setTasks } from "./Redux/slices/taskSlice";
import axios from "axios";

const CustomTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const dispatch = useDispatch();
  // Get tasks from Redux store
  const tasks = useSelector((state) => state.tasks.tasks);
  const navigate = useNavigate();

  const paginatedTasks = tasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(tasks.length / pageSize);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    setOpenDropdownId(null);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to signup if token is missing
    }
  }, [navigate]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect if token missing
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tasks/getTasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setTasks(response.data)); // ✅ Dispatch tasks to Redux
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [dispatch, navigate]);
  return (
    <div className="full-screen">
      <div className="header-section">
        <h2 className="title">Tasks Management</h2>
        <button className="add-task-button" onClick={() => navigate("/addtask")}>+ Add Task</button>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Date & Time</th>
            <th>Task</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.map((task, index) => (
            <tr key={task.id}>
              <td className="rows">{index + 1 + (currentPage - 1) * pageSize}</td>
              <td className="rows">{task.dueDate}</td>
              <td className="rows">{task.taskName}</td>
              <td className="rows">{task.description}</td>
              <td className="action-cell">
                <button
                  className="action-button"
                  onClick={() => setOpenDropdownId(openDropdownId === task.id ? null : task.id)}
                >
                  ⋮
                </button>

                {openDropdownId === task.id && (
                  <div className="dropdown-card">
                    <div className="dropdown-item">Edit</div>
                    <div className="dropdown-item" onClick={() => handleDelete(task.id)}>
                      Delete
                    </div>
                  </div>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-container">
        <button
          className="pagination-arrow"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &#8249;
        </button>

        <div className="pagination-pages">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`pagination-number ${currentPage === i + 1 ? "active-page" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          className="pagination-arrow"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          &#8250;
        </button>
      </div>

    </div>
  );
};

export default CustomTable;
