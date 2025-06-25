import React, { useState } from "react";
import axios from "axios";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    phonenumber: "",
    emailId: "",
    address: "",
    notes: "",
    floor: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5013/api/v1/patients/",
        formData
      );
      alert(`✅ Patient Registered.`);
      setFormData({
        patientName: "",
        age: "",
        gender: "",
        phonenumber: "",
        emailId: "",
        address: "",
        notes: "",
        floor: "",
        isActive: true,
      });
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <form onSubmit={submitForm} style={{ maxWidth: 500, margin: "auto" }}>
      <h2>Register Patient</h2>
      <input
        name="patientName"
        placeholder="Name"
        value={formData.patientName}
        onChange={handleChange}
        required
      />
      <input
        name="age"
        placeholder="Age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        name="phonenumber"
        placeholder="Phone Number"
        value={formData.phonenumber}
        onChange={handleChange}
        required
      />
      <input
        name="emailId"
        placeholder="Email"
        type="email"
        value={formData.emailId}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
      />
      <input
        name="floor"
        placeholder="Floor (optional)"
        value={formData.floor}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />
        Active
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default PatientForm;
