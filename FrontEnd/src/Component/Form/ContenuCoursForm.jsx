import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import StudentApi from '../../service/api/student/StudentApi' ;
import ClassTypeCourseApi from '../../service/api/student/ClassTypeCourseApi' ;
import ClassApi from '../../service/api/student/ClassApi' ;
import ContenuCoursApi from '../../service/api/student/ContenuCoursApi' ;
import TeacherApi from '../../service/api/student/TeacherApi';



const ContenuCoursForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contenu_pdf_base64: '',
    classe_id: '',
    class_type_course_id: '',
    teacher_id: ''
  });

  const [classes, setClasses] = useState([]);
  const [classTypeCourses, setClassTypeCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    ClassApi.allT().then((response) => {
      setClasses(response.data.data);
    });

    ClassTypeCourseApi.allT().then((response) => {
      setClassTypeCourses(response.data.data);
    });

    TeacherApi.allT().then((response) => {
      setTeachers(response.data.data);
    });

    if (props.operation === 'updateuser' && props.CCvalues) {
      setFormData(props.CCvalues);
    }
  }, [props.operation, props.CCvalues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, contenu_pdf_base64: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Titre requis';
    if (!formData.description.trim()) newErrors.description = 'Description requise';
    if (!formData.contenu_pdf_base64) newErrors.contenu_pdf_base64 = 'Fichier PDF requis';
    if (!formData.classe_id) newErrors.classe_id = 'Classe requise';
    if (!formData.class_type_course_id) newErrors.class_type_course_id = 'Cours requis';
    if (!formData.teacher_id) newErrors.teacher_id = 'Enseignant requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    console.log(formData)

    try {
      if (props.operation === "create") {
        await ContenuCoursApi.create(formData);
        alert('Contenu créé avec succès!');
        setFormData({
          title: '',
          description: '',
          contenu_pdf_base64: '',
          classe_id: '',
          class_type_course_id: '',
          teacher_id: ''
        });
        setErrors({});
      } else if (props.operation === "updateuser") {
        await ContenuCoursApi.update(props.contenuCoursId, formData);
        alert('Contenu modifié avec succès!');
        props.onSuccess();
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Titre *</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          isInvalid={!!errors.title}
          placeholder="Titre du contenu"
        />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          isInvalid={!!errors.description}
          placeholder="Description du contenu"
        />
        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fichier PDF *</Form.Label>
        <Form.Control
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          isInvalid={!!errors.contenu_pdf_base64}
        />
        <Form.Control.Feedback type="invalid">{errors.contenu_pdf_base64}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Classe *</Form.Label>
        <Form.Select
          name="classe_id"
          value={formData.classe_id}
          onChange={handleChange}
          isInvalid={!!errors.classe_id}
        >
          <option value="">Choisir une classe</option>
          {classes.map((classe) => (
            <option key={classe.id} value={classe.id}>
              {classe.name} ({classe.code})
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.classe_id}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cours *</Form.Label>
        <Form.Select
          name="class_type_course_id"
          value={formData.class_type_course_id}
          onChange={handleChange}
          isInvalid={!!errors.class_type_course_id}
        >
          <option value="">Choisir un cours</option>
          {classTypeCourses.map((ctc) => (
            <option key={ctc.id} value={ctc.id}>
              {ctc.course?.name || 'Course'} - Coef: {ctc.coef}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.class_type_course_id}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enseignant *</Form.Label>
        <Form.Select
          name="teacher_id"
          value={formData.teacher_id}
          onChange={handleChange}
          isInvalid={!!errors.teacher_id}
        >
          <option value="">Choisir un enseignant</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.firstname} {teacher.lastname}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.teacher_id}</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting 
          ? 'Enregistrement...'
          : (props.operation === 'updateuser' ? 'Modifier' : 'Ajouter')
        }
      </Button>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mt-3">
          Veuillez corriger les erreurs ci-dessus
        </Alert>
      )}
    </Form>
  );
};

export default ContenuCoursForm;