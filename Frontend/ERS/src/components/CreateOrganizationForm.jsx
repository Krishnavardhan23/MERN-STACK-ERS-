import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import '../assets/styles/createorg.css';

const CreateOrganizationForm = () => {
  const [organization, setOrganization] = useState({
    organization_name: "",
    mail: "",
    adminname: ""
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrganization(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const { organization_name, mail, adminname } = organization;
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          organization_name,
          mail,
          adminname
        })
      });
  
      let data;
      try {
        data = await res.json();
      } catch (err) {
        throw new Error('Invalid JSON response');
      }
  
      if (res.status === 201) {
        setMessage(data.message);
        setError('');
        // Navigate to AdminForm with query parameter before resetting state
        navigate(`/adminform?organization_name=${organization.organization_name}`);
      } 
      else {
        setError(data.error || 'Failed to register organization');
        setMessage('');
      }
    } catch (error) {
      console.log(error);
      setError('Failed to register organization');
      setMessage('');
    }
  };

  return (
    <div className="createorg-container">
      <NavLink></NavLink>
      <div className="createorg-form">
        <form method='POST' onSubmit={PostData}>
          <div>
            <i className="zmdi zmdi-library"></i>
            <input
              type="text"
              name="organization_name"
              value={organization.organization_name}
              onChange={handleInputChange}
              required
              placeholder='Organization Name'
            />
          </div>
          <div>
            <i className="zmdi zmdi-email"></i>
            <input 
              type="email"
              name="mail"
              value={organization.mail}
              onChange={handleInputChange}
              required
              placeholder='Email'
            />
          </div>
          <div>
            <i className="zmdi zmdi-account"></i>
            <input
              type="text"
              name="adminname"
              value={organization.adminname}
              onChange={handleInputChange}
              required
              placeholder='Admin Name'
            />
          </div>
          <button type="submit" value="register">Register</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </div>
      <div className="createorg-image">
        <img src="/register.png" alt="A girl is trying to do registration" />
      </div>
    </div>
  );
};

export default CreateOrganizationForm;
