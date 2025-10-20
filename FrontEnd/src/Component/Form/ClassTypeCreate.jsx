import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import ClassTypeApi from '../../service/api/student/ClassTypeApi';

const ClassTypeForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    code: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (props.operation === 'updateuser' && props.CTvalues) {
      setFormData(props.CTvalues);
    }
  }, [props.operation, props.CTvalues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length > 255) newErrors.name = 'Name must be less than 255 characters';

    if (!formData.code.trim()) newErrors.code = 'Code is required';
    else if (formData.code.length > 10) newErrors.code = 'Code must be less than 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (props.operation === "create") {
        const response = await ClassTypeApi.create(formData);
        alert('Class type created successfully!');
        setFormData({
          name: '',
          code: ''
        });
        setErrors({});
      } else if (props.operation === "updateuser") {
        const response = await ClassTypeApi.update(props.classTypeId, formData);
        alert('Class type updated successfully!');
        props.onSuccess();
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(`Error ${props.operation === 'create' ? 'creating' : 'updating'} class type`);
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
          placeholder="Enter class type name"
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Code *</Form.Label>
        <Form.Control
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          isInvalid={!!errors.code}
          placeholder="Enter unique code (max 10 characters)"
          style={{ textTransform: 'uppercase' }}
        />
        <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
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

export default ClassTypeForm;