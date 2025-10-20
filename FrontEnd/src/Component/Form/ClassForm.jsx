import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import ClassApi from '../../service/api/student/ClassApi';
import ClassTypeApi from '../../service/api/student/ClassTypeApi';

const ClassForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    class_type_id: ''
  });

  const [classTypes, setClassTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Charger les types de classe
    ClassTypeApi.all().then((response) => {
      setClassTypes(response.data.data);
    });

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

    if (formData.name && formData.name.length > 255) {
      newErrors.name = 'Name must be less than 255 characters';
    }

    if (!formData.code.trim()) newErrors.code = 'Code is required';
    else if (formData.code.length > 10) newErrors.code = 'Code must be less than 10 characters';

    if (!formData.class_type_id) newErrors.class_type_id = 'Class type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (props.operation === "create") {
        const response = await ClassApi.create(formData);
        alert('Class created successfully!');
        setFormData({
          name: '',
          code: '',
          class_type_id: ''
        });
        setErrors({});
      } else if (props.operation === "updateuser") {
        const response = await ClassApi.update(props.classId, formData);
        alert('Class updated successfully!');
        props.onSuccess();
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(`Error ${props.operation === 'create' ? 'creating' : 'updating'} class`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
          placeholder="Enter class name "
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

      <Form.Group className="mb-3">
        <Form.Label>Class Type *</Form.Label>
        <Form.Select
          name="class_type_id"
          value={formData.class_type_id}
          onChange={handleChange}
          isInvalid={!!errors.class_type_id}
        >
          <option value="">Select Class Type</option>
          {classTypes.map((classType) => (
            <option key={classType.id} value={classType.id}>
              {classType.name} ({classType.code})
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.class_type_id}</Form.Control.Feedback>
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

export default ClassForm;