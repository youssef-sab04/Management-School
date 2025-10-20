import React, { useEffect, useState } from 'react';
import CourseApi from '../../service/api/student/CourseApi' ;
import { Form, Button, Alert } from 'react-bootstrap';

const CourseForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (props.operation === 'updateuser' && props.Cvalues) {
      setFormData(props.Cvalues);
    }
  }, [props.operation, props.Cvalues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length > 255) newErrors.name = 'Name must be less than 255 characters';

    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (props.operation === "create") {
        console.log(formData)
        const response = await CourseApi.create(formData);
        alert('Course created successfully!');
        setFormData({
          name: '',
          description: ''
        });
        setErrors({});
      } else if (props.operation === "updateuser") {
        const response = await CourseApi.update(props.courseId, formData);
        alert('Course updated successfully!');
        props.onSuccess();
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(`Error ${props.operation === 'create' ? 'creating' : 'updating'} course`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name *</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
          placeholder="Enter course name"
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description *</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          isInvalid={!!errors.description}
          placeholder="Enter course description"
        />
        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
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

export default CourseForm;