import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import ExamApi from '../../service/api/student/ExamApi' ;
import TeacherApi  from '../../service/api/student/TeacherApi' ;
import ClassApi from '../../service/api/student/ClassApi' ;
import ClassTypeCourseApi from '../../service/api/student/ClassTypeCourseApi' ;
const ExamForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    teacher_id: '',
    classe_id: '',
    class_type_course_id: '',
    type: 'cc'
  });

  const [teachers, setTeachers] = useState([]);

  const [classes, setClasses] = useState([]);
  const [classTypeCourses, setClassTypeCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  

    
  useEffect(() => {
    // Charger les données nécessaires
    TeacherApi.allT().then((response) => {
      setTeachers(response.data.data);
    });

    ClassApi.allT().then((response) => {
      setClasses(response.data.data);
    });

    ClassTypeCourseApi.allT().then((response) => {
      setClassTypeCourses(response.data.data);
    });

    if (props.operation === 'updateuser' && props.Evalues) {
      setFormData(props.Evalues);
    }
  }, [props.operation, props.Evalues]);

  // Filtrer les class_type_courses en fonction de la classe sélectionnée
  const filteredClassTypeCourses = classTypeCourses.filter(ctc => 
    !formData.classe_id || ctc.classe_id == formData.classe_id
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      // Réinitialiser class_type_course_id si la classe change
      ...(name === 'classe_id' && { class_type_course_id: '' })
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };
   


  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length > 255) newErrors.name = 'Name must be less than 255 characters';

    if (!formData.teacher_id) newErrors.teacher_id = 'Teacher is required';
    if (!formData.classe_id) newErrors.classe_id = 'Class is required';
    if (!formData.class_type_course_id) newErrors.class_type_course_id = 'Course is required';
    if (!formData.type) newErrors.type = 'Type is required';

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
        const response = await ExamApi.create(formData);
        alert('Exam created successfully!');
        setFormData({
          name: '',
          teacher_id: '',
          classe_id: '',
          class_type_course_id: '',
          type: 'cc'
        });
        setErrors({});
      } else if (props.operation === "updateuser") {
        const response = await ExamApi.update(props.examId, formData);
        alert('Exam updated successfully!');
        props.onSuccess();
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(`Error ${props.operation === 'create' ? 'creating' : 'updating'} exam`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Exam Name *</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
          placeholder="Enter exam name"
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Teacher *</Form.Label>
        <Form.Select
          name="teacher_id"
          value={formData.teacher_id}
          onChange={handleChange}
          isInvalid={!!errors.teacher_id}
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.firstname} {teacher.lastname}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.teacher_id}</Form.Control.Feedback>
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
        <Form.Label>Course *</Form.Label>
        <Form.Select
          name="class_type_course_id"
          value={formData.class_type_course_id}
          onChange={handleChange}
          isInvalid={!!errors.class_type_course_id}
          disabled={!formData.classe_id}
        >
          <option value="">
            {formData.classe_id ? 'Select Course' : 'Please select a class first'}
          </option>
          {filteredClassTypeCourses.map((ctc) => (
            <option key={ctc.id} value={ctc.id}>
              {ctc.course?.name || 'Course'} - Coef: {ctc.coef}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.class_type_course_id}</Form.Control.Feedback>
        {!formData.classe_id && (
          <Form.Text className="text-muted">
            Please select a class first to see available courses
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Exam Type *</Form.Label>
        <div>
          <Form.Check
            inline
            type="radio"
            name="type"
            value="cc"
            checked={formData.type === 'cc'}
            onChange={handleChange}
            label="Contrôle Continu"
            isInvalid={!!errors.type}
          />
          <Form.Check
            inline
            type="radio"
            name="type"
            value="efm"
            checked={formData.type === 'efm'}
            onChange={handleChange}
            label="Examen Final"
            isInvalid={!!errors.type}
          />
        </div>
        <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
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

export default ExamForm;