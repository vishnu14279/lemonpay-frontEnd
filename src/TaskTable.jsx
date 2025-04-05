import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "./Redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EllipsisOutlined } from "@ant-design/icons";
import "./TaskTable.css";
import dayjs from "dayjs";

const CustomTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://lemonpay-backend.onrender.com/api/tasks/getTasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setTasks(response.data));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(`https://lemonpay-backend.onrender.com/api/tasks/deleteTask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setTasks(tasks.filter((task) => task._id !== id)));
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Date & Time",
      dataIndex: "dueDate",
      style: { backgroundColor: "#FFF" },
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm"),

    },
    {
      title: "Task",
      dataIndex: "taskName",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item onClick={() => navigate(`/updatetask/${record._id}`)}>
                Edit
              </Menu.Item>
              <Menu.Item onClick={() => handleDelete(record._id)}>
                Delete
              </Menu.Item>
            </Menu>
          }
        >
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="full-screen">
      <div className="header-section">
        <h2 className="title">Tasks Management</h2>
        <button className="add-task-button" onClick={() => navigate("/addtask")}>+ Add Task</button>

      </div>

      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        pagination={{
          pageSize,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default CustomTable;
