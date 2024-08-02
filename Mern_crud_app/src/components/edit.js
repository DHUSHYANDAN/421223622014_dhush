import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Edit() {
  const [formData, setFormData] = useState({
    name: '',
    registration_number: '',
    dept: '',
    dob: '',
    email: '',
    description: ''
  });

  const { registration_number } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/updateuser/${registration_number}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [registration_number]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/updateusers`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert(response.data.message);
      navigate('/viewUsers'); 
    } catch (error) {
      console.error('Error:', error);
      alert( 'Unable to update the form. Please try again later.');
    }
  };

  return (
    <>
      <div className="header">
        <h1>Edit Student Details</h1>
        <h3><Link to="/viewUsers" className="add-user">View Users</Link></h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form_in">
          <label htmlFor="name">Name:</label><br />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          /><br />

          <label htmlFor="registration_number">Registration Number:</label><br />
          <input
            type="number"
            id="registration_number"
            name="registration_number"
            value={formData.registration_number}
            onChange={handleChange}
            required
            readOnly
           
          /><br />

          <label htmlFor="dept">Department:</label><br />
          <input
            type="text"
            id="dept"
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            required
          /><br />

          <label htmlFor="dob">Date of Birth:</label><br />
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            min="1900-01-01"
            max="2005-12-31"
          /><br />

          <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          /><br />

          <label htmlFor="description">Description:</label><br />
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea><br /><br />

          <button type="submit">Submit</button><br />
        </div>
      </form>
    </>
  );
}

export default Edit;
