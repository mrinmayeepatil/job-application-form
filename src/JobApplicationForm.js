import React, { useState, useEffect } from 'react';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: 'Developer',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => {
        const newSkills = checked
          ? [...prevState.additionalSkills, value]
          : prevState.additionalSkills.filter((skill) => skill !== value);
        return { ...prevState, additionalSkills: newSkills };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    let errors = {};
    if (!formData.fullName) errors.fullName = 'Full Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if ((formData.position === 'Developer' || formData.position === 'Designer') && !formData.relevantExperience) {
      errors.relevantExperience = 'Relevant Experience is required';
    } else if ((formData.position === 'Developer' || formData.position === 'Designer') && (isNaN(formData.relevantExperience) || formData.relevantExperience <= 0)) {
      errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    }
    if (formData.position === 'Designer' && !formData.portfolioUrl) {
      errors.portfolioUrl = 'Portfolio URL is required';
    } else if (formData.position === 'Designer' && !/^https?:\/\/.+\..+/.test(formData.portfolioUrl)) {
      errors.portfolioUrl = 'Portfolio URL is invalid';
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (formData.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected';
    }
    if (!formData.interviewTime) {
      errors.interviewTime = 'Preferred Interview Time is required';
    } else if (isNaN(Date.parse(formData.interviewTime))) {
      errors.interviewTime = 'Preferred Interview Time must be a valid date and time';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Full Name:
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          </label>
          {errors.fullName && <p>{errors.fullName}</p>}
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </label>
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
        </div>
        <div>
          <label>
            Applying for Position:
            <select name="position" value={formData.position} onChange={handleChange}>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </label>
        </div>
        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div>
            <label>
              Relevant Experience (years):
              <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
            </label>
            {errors.relevantExperience && <p>{errors.relevantExperience}</p>}
          </div>
        )}
        {formData.position === 'Designer' && (
          <div>
            <label>
              Portfolio URL:
              <input type="text" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} />
            </label>
            {errors.portfolioUrl && <p>{errors.portfolioUrl}</p>}
          </div>
        )}
        {formData.position === 'Manager' && (
          <div>
            <label>
              Management Experience:
              <textarea name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
            </label>
            {errors.managementExperience && <p>{errors.managementExperience}</p>}
          </div>
        )}
        <div>
          <label>Additional Skills:</label>
          <div>
            <label>
              <input type="checkbox" name="additionalSkills" value="JavaScript" onChange={handleChange} />
              JavaScript
            </label>
            <label>
              <input type="checkbox" name="additionalSkills" value="CSS" onChange={handleChange} />
              CSS
            </label>
            <label>
              <input type="checkbox" name="additionalSkills" value="Python" onChange={handleChange} />
              Python
            </label>
            {/* Add more checkboxes as needed */}
          </div>
          {errors.additionalSkills && <p>{errors.additionalSkills}</p>}
        </div>
        <div>
          <label>
            Preferred Interview Time:
            <input type="datetime-local" name="interviewTime" value={formData.interviewTime} onChange={handleChange} />
          </label>
          {errors.interviewTime && <p>{errors.interviewTime}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div>
          <h2>Form Submission Summary:</h2>
          <p>Full Name: {formData.fullName}</p>
          <p>Email: {formData.email}</p>
          <p>Phone Number: {formData.phoneNumber}</p>
          <p>Applying for Position: {formData.position}</p>
          {(formData.position === 'Developer' || formData.position === 'Designer') && (
            <p>Relevant Experience: {formData.relevantExperience} years</p>
          )}
          {formData.position === 'Designer' && (
            <p>Portfolio URL: {formData.portfolioUrl}</p>
          )}
          {formData.position === 'Manager' && (
            <p>Management Experience: {formData.managementExperience}</p>
          )}
          <p>Additional Skills: {formData.additionalSkills.join(', ')}</p>
          <p>Preferred Interview Time: {new Date(formData.interviewTime).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
