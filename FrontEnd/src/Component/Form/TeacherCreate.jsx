import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import TeacherApi from '../../service/api/student/TeacherApi';

const TeacherForm = (props) => {
  const [formData, setFormData] = useState({
    firstname: '', lastname: '', date_of_birth: '', gender: '',
    blood_type: '', address: '', phone: '', email: '', password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (props.operation === 'updateuser' && props.Tvalues) {
      setFormData(props.Tvalues);
    }
  }, [props.operation, props.Tvalues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = 'Firstname is required';
    else if (formData.firstname.length > 50) newErrors.firstname = 'Firstname must be less than 50 characters';

    if (!formData.lastname.trim()) newErrors.lastname = 'Lastname is required';
    else if (formData.lastname.length > 50) newErrors.lastname = 'Lastname must be less than 50 characters';

    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.blood_type) newErrors.blood_type = 'Blood type is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    else if (formData.address.length > 255) newErrors.address = 'Address must be less than 255 characters';

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must contain exactly 10 digits';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (props.operation === 'create' && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (props.operation === "create") {
        const response = await TeacherApi.create(formData);
        alert('Teacher created successfully!');
        setFormData({
          firstname: '', lastname: '', date_of_birth: '', gender: '',
          blood_type: '', address: '', phone: '', email: '', password: ''
        });
        setErrors({});
      } else if (props.operation === "updateuser") {
        const response = await TeacherApi.update(props.teacherId, formData);
        alert('Teacher updated successfully!');
        props.onSuccess();
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(`Error ${props.operation === 'create' ? 'creating' : 'updating'} teacher`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Firstname</Form.Label>
        <Form.Control
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          isInvalid={!!errors.firstname}
        />
        <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Lastname</Form.Label>
        <Form.Control
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          isInvalid={!!errors.lastname}
        />
        <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          isInvalid={!!errors.date_of_birth}
        />
        <Form.Control.Feedback type="invalid">{errors.date_of_birth}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          isInvalid={!!errors.gender}
        >
          <option value="">Select</option>
          <option value="m">Male</option>
          <option value="f">Female</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Blood Type</Form.Label>
        <Form.Select
          name="blood_type"
          value={formData.blood_type}
          onChange={handleChange}
          isInvalid={!!errors.blood_type}
        >
          <option value="">Select</option>
          {['O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.blood_type}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          as="textarea"
          name="address"
          value={formData.address}
          onChange={handleChange}
          isInvalid={!!errors.address}
        />
        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          isInvalid={!!errors.phone}
        />
        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          placeholder={props.operation === 'updateuser' ? 'Leave blank to keep current password' : ''}
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting 
          ? (props.operation === 'updateuser' ? 'Updating...' : 'Creating...')
          : (props.operation === 'updateuser' ? 'Update' : 'Create')
        }
      </Button>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mt-3">
          Please fix the errors above before submitting.
        </Alert>
      )}
    </Form>
  );
};

export default TeacherForm;