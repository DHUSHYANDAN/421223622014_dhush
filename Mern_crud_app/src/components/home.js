import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    registration_number: '',
    dept: '',
    dob: '',
    email: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/addusers', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert(response.data.message);
      setFormData({
        name: '',
        registration_number: '',
        dept: '',
        dob: '',
        email: '',
        description: ''
      });
      
      navigate('/viewUsers'); // Redirect to /viewUsers page
    } catch (error) {
      console.error('Error:', error);
      alert(error.response ? error.response.data.error : 'Unable to submit the form. Please try again later.');
      // alert('Error: Unable to submit the form. Please try again later.');
    }
  };

  return (
    <>
      <div className="header">
        <h1>Add Student Details</h1>
        <h3><Link to="/viewUsers" className="add-user">View Users</Link></h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form_in">
          <label htmlFor="name">Name:</label><br />
          <input type="text" id="name" value={formData.name} onChange={handleChange} required /><br />
          
          <label htmlFor="registration_number">Registration Number:</label><br />
          <input type="number" id="registration_number" value={formData.registration_number} onChange={handleChange} required /><br />
          
          <label htmlFor="dept">Department:</label><br />
          <input type="text" id="dept" value={formData.dept} onChange={handleChange} required /><br />
          
          <label htmlFor="dob">Date of Birth:</label><br />
          <input type="date" id="dob" value={formData.dob} onChange={handleChange} required min="1900-01-01" max="2005-12-31" /><br />
          
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" value={formData.email} onChange={handleChange} required /><br />
          
          <label htmlFor="description">Description:</label><br />
          <textarea id="description" value={formData.description} onChange={handleChange} required></textarea><br />
          
          <button type="submit">Submit</button><br /><br />
        </div>
      </form>
    </>
  );
}

export default Home;
