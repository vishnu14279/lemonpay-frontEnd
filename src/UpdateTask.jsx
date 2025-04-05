import React, { useEffect, useState } from "react";
import { Input, Button, DatePicker, Form, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import "./AddTask.css";

const UpdateTask = () => {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(dayjs());
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get(`http://localhost:3000/api/tasks/getTask/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const { taskName, description, dueDate } = response.data;
                    setTaskName(taskName);
                    setDescription(description);
                    setDate(dayjs(dueDate));
                } catch (err) {
                    message.error(err, "Failed to load task data");
                }
            };

            fetchTask();
        }
    }, [id]);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        setErrors([]); // reset

        try {

            await axios.put(`http://localhost:3000/api/tasks/updateTask/${id}`, {
                taskName,
                description,
                dueDate: date,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            message.success("Task updated successfully!");


            navigate("/tasks");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors); // set validation errors
            } else {
                console.error("Something went wrong", error);
            }
        }
    };

    return (
        <div className="add-task-container">
            <h2 className="title">{id ? "Edit Task" : "Add Task"}</h2>
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
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder="Select Date & Time"
                        value={date}
                        onChange={(value) => setDate(value)}
                        className="task-input"
                    />
                </Form.Item>

                <div className="button-group">
                    <Button type="primary" htmlType="submit" className="save-button">
                        {id ? "Update" : "Save"}
                    </Button>

                    <Button type="primary" htmlType="submit" className="cancel-button" onClick={() => navigate("/tasks")}>
                        Cancel
                    </Button>
                </div>
                {errors.length > 0 && (
                    <div className="error-container">
                        {errors.map((err, index) => (
                            <p key={index} style={{ color: "red" }}>
                                {err.msg}
                            </p>
                        ))}
                    </div>
                )}
            </Form>
        </div>
    );
};

export default UpdateTask;
