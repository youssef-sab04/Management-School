import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import ExamRecordApi from '../../service/api/student/ExamRecordApi';
import ExamApi from '../../service/api/student/ExamApi';
import StudentApi from '../../service/api/student/StudentApi';
const ExamsRecordForm = (props) => {
  const [formData, setFormData] = useState({
    exam_id: '',
    user_id: '',
    note: '',
    comment: ''
  });

  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    ExamApi.all().then((response) => {
      setExams(response.data.data);
    });

    StudentApi.allT().then((response) => {
      setStudents(response.data.data);
    });

    if (props.operation === 'updateuser' && props.ERvalues) {
      setFormData(props.ERvalues);
    }
  }, [props.operation, props.ERvalues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.exam_id) newErrors.exam_id = 'Examen requis';
    if (!formData.user_id) newErrors.user_id = 'Élève requis';
    
    if (!formData.note) newErrors.note = 'Note requise';
    else if (formData.note < 0 || formData.note > 20) newErrors.note = 'Note entre 0 et 20';

    if (!formData.comment.trim()) newErrors.comment = 'Commentaire requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (props.operation === "create") {
        await ExamRecordApi.create(formData);
        alert('Note ajoutée avec succès!');
        setFormData({
          exam_id: '',
          user_id: '',
          note: '',
          comment: ''
        });
        setErrors({});
      } else if (props.operation === "updateuser") {
        await ExamRecordApi.update(props.examsRecordId, formData);
        alert('Note modifiée avec succès!');
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
  console.log(students)

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Examen *</Form.Label>
        <Form.Select
          name="exam_id"
          value={formData.exam_id}
          onChange={handleChange}
          isInvalid={!!errors.exam_id}
        >
          <option value="">Choisir un examen</option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.name} ({exam.type === 'cc' ? 'Contrôle Continu' : 'Examen Final'})
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.exam_id}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Élève *</Form.Label>
        <Form.Select
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          isInvalid={!!errors.user_id}
        >
          <option value="">Choisir un élève</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstname} {student.lastname}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.user_id}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Note *</Form.Label>
        <Form.Control
          type="number"
          name="note"
          value={formData.note}
          onChange={handleChange}
          min="0"
          max="20"
          step="0.5"
          isInvalid={!!errors.note}
          placeholder="Note sur 20"
        />
        <Form.Control.Feedback type="invalid">{errors.note}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Commentaire *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          isInvalid={!!errors.comment}
          placeholder="Commentaire sur la copie"
        />
        <Form.Control.Feedback type="invalid">{errors.comment}</Form.Control.Feedback>
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

export default ExamsRecordForm;