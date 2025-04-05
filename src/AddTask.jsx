import React, { useState ,useEffect} from "react";
import { Input, Button, DatePicker, Form, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";
// import dayjs from "dayjs";

const AddTask = () => {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null)
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const handleSubmit = async () => {
        setErrors([]); // reset
        try {
            const response = await axios.post("https://lemonpay-backend.onrender.com/api/tasks/create", {
                taskName: taskName,
                description,
                dueDate: date,
            });

            if (response.status === 201) {
                message.success("Task created successfully!");
                navigate("/tasks");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors); // set validation errors
            } else {
                console.error("Something went wrong", error);
            }
        }
    };
     useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/");
      }, [navigate]);
    
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
                        Save
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

export default AddTask;
