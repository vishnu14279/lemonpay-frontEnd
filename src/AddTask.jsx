import React, { useState } from "react";
import { Input, Button, DatePicker, Form, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

const AddTask = () => {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/tasks/create", {
                taskName: taskName,
                description,
                dueDate: date,
            });

            if (response.status === 201) {
                message.success("Task created successfully!");
                navigate("/tasks");
            }
        } catch (error) {
            message.error(error.response?.data?.error || "Failed to create task.");
        }
    };

    return (
        <div className="add-task-container">
            <h2 className="title">Add Task</h2>
            <Form layout="vertical" onFinish={handleSubmit} className="task-form">
                <Form.Item>
                    <Input
                        placeholder="Enter Task Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="task-input"
                    />
                </Form.Item>
                <Form.Item>
                    <Input.TextArea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="task-input"
                    />
                </Form.Item>
                <Form.Item>
                    <DatePicker
                        placeholder="Date Picker"
                        value={date}
                        onChange={(value) => setDate(value)}
                        className="task-input"
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="save-button">
                    Save
                </Button>
            </Form>
        </div>
    );
};

export default AddTask;
