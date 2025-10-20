import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import ClassTypeCourseApi from '../../service/api/student/ClassTypeCourseApi';
import ClassApi from '../../service/api/student/ClassApi';
import CourseApi from '../../service/api/student/CourseApi';



const ClassTypeCourseForm = (props) => {
  const [formData, setFormData] = useState({
    courses_id: '',
    classe_id: '',
    coef: ''
  });

  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Charger les cours et classes
    CourseApi.all().then((response) => {
      setCourses(response.data.data);
    });

    ClassApi.all().then((response) => {
      setClasses(response.data.data);
    });

    if (props.operation === 'updateuser' && props.CTCvalues) {
      setFormData(props.CTCvalues);
    }
  }, [props.operation, props.CTCvalues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.courses_id) newErrors.courses_id = 'Course is required';
    if (!formData.classe_id) newErrors.classe_id = 'Class is required';
    
    if (!formData.coef) newErrors.coef = 'Coefficient is required';
    else if (formData.coef < 1 || formData.coef > 10) newErrors.coef = 'Coefficient must be between 1 and 10';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (props.operation === "create") {
        const response = await ClassTypeCourseApi.create(formData);
        alert('Class type course created successfully!');
        setFormData({
          courses_id: '',
          classe_id: '',
          coef: ''
        });
        setErrors({});
      } else if (props.operation === "updateuser") {
        const response = await ClassTypeCourseApi.update(props.classTypeCourseId, formData);
        alert('Class type course updated successfully!');
        props.onSuccess();
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(`Error ${props.operation === 'create' ? 'creating' : 'updating'} class type course`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Course *</Form.Label>
        <Form.Select
          name="courses_id"
          value={formData.courses_id}
          onChange={handleChange}
          isInvalid={!!errors.courses_id}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.courses_id}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Class *</Form.Label>
        <Form.Select
          name="classe_id"
          value={formData.classe_id}
          onChange={handleChange}
          isInvalid={!!errors.classe_id}
        >
          <option value="">Select Class</option>
          {classes.map((classe) => (
            <option key={classe.id} value={classe.id}>
              {classe.name} ({classe.code})
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.classe_id}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Coefficient *</Form.Label>
        <Form.Control
          type="number"
          name="coef"
          value={formData.coef}
          onChange={handleChange}
          min="1"
          max="10"
          isInvalid={!!errors.coef}
          placeholder="Enter coefficient (1-10)"
        />
        <Form.Control.Feedback type="invalid">{errors.coef}</Form.Control.Feedback>
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

export default ClassTypeCourseForm;