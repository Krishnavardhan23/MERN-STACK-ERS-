import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/AddWork.css';

const AddWork = () => {
  const { organization_name, employeeId } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]); 
  const [work, setWork] = useState({
    title: "",
    description: "",
    due_date: "",  
    assigned_to: "" 
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/getemployees/${organization_name}`);
        setEmployees(response.data.employees || []);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, [organization_name]);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setWork({
      ...work,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/admin/addwork/${organization_name}/${employeeId}`, work);
      toast.success('Work added successfully!');
      navigate(`/adminhome/${organization_name}/${employeeId}`);
    } catch (error) {
      toast.error('Failed to add work. Please try again.');
      console.error('Failed to add work:', error);
    }
  };

  return (
    <div>
      <div className="addWork-container">
        <button className="back-button" onClick={() => navigate(`/adminhome/${organization_name}/${employeeId}`)}>Back to Dashboard</button>
        <div className="addworkform">
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={work.title}
              onChange={handleFormData}
              required
            />
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={work.description}
              onChange={handleFormData}
              required
            />
            <label>Due Date:</label>
            <input
              type="date"
              name="due_date"
              value={work.due_date}
              onChange={handleFormData}
              required
            />
            <label>Assign To:</label>
            <select
              name="assigned_to"
              value={work.assigned_to}
              onChange={handleFormData}
              required
            >
              <option value="">Select Employee</option>
              {Array.isArray(employees) && employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.empname}
                </option>
              ))}
            </select>
            <button type="submit">Add Work</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddWork;
