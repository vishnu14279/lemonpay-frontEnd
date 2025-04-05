import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import Signup from "./SignUp.jsx"; // Create this component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./Redux/store.js"; // Adjust path based on folder structure
import TaskTable from './TaskTable.jsx';
import AddTask from './AddTask'
// import store from "./store";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={store}> */}
    <Provider store={store}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tasks" element={<TaskTable />} />
          <Route path="/addtask" element={<AddTask />} />
                  </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)