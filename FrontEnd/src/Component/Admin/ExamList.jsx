import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import ExamApi from '../../service/api/student/ExamApi';
import ExamForm from '../Form/ExamForm';


const ExamList = (props) => {
    const [exams, setExams] = useState([]);
    const [examDelete, setExamDelete] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [examUpdateData, setExamUpdateData] = useState(null);
    const [examUpdateId, setExamUpdateId] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);



    const Col = [
        { "k": 1, "nom": "ID" },
        { "k": 2, "nom": "Name" },
        { "k": 3, "nom": "Teacher" },
        { "k": 4, "nom": "Class" },
        { "k": 5, "nom": "Course" },
        { "k": 6, "nom": "Type" },
        { "k": 7, "nom": "Updated At" }
    ];

    useEffect(() => {
        ExamApi.all().then((response) => {
            setExams(response.data.data);
        });
    }, []);
    console.log(exams)

    const deleteExam = (id, name) => {
        setSelectedExam(name);
        setExamDelete({ id, name });
        setShowModal(true);
    }

    const confirmDelete = async () => {
        try {
            await ExamApi.delete(examDelete.id);
            ExamApi.all().then((response) => {
                setExams(response.data.data);
            });
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting exam:", error);
        }
    }

    const updateExam = (id) => {
        setExamUpdateId(id);
        const exam = exams.find(e => e.id === id);
        setExamUpdateData(exam);
        setShowOffcanvas(true);
    }

    const handleUpdateSuccess = () => {
        setShowOffcanvas(false);
        ExamApi.all().then((response) => {
            setExams(response.data.data);
        });
    };

    const getTypeBadge = (type) => {
        if (type === 'cc') {
            return <Badge bg="info">Contrôle Continu</Badge>;
        } else if (type === 'efm') {
            return <Badge bg="warning">Examen Final</Badge>;
        }
        return <Badge bg="secondary">{type}</Badge>;
    };

    return (
        <>
           

            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {Col.map((el) => (
                                <th key={el.k}>
                                    {el.nom}
                                    
                                </th>
                            ))}
                            <th></th>
                                                        <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {exams.map((exam) => (
                            <tr key={exam.id}>
                                <td>{exam.id}</td>
                                <td>{exam.name}</td>
                                <td>
                                    {exam.teacher ? 
                                        `${exam.teacher.name} ${exam.teacher.l}` : 
                                        exam.teacher_id
                                    }
                                </td>
                                <td>
                                    {exam.classe ? 
                                        `${exam.classe.name} (${exam.classe.code})` : 
                                        exam.classe_id
                                    }
                                </td>
                                <td>
                                    {exam.class_type_course ? 
                                        `${exam.class_type_course.course?.name || 'Course'}` : 
                                        exam.class_type_course_id
                                    }
                                </td>
                                <td>{exam.type}</td>
                                <td>{new Date(exam.updated_at).toLocaleDateString('fr-FR')}</td>
                                <td>
                                    
                                    
                                </td>
                                <td><Button variant="danger" onClick={() => deleteExam(exam.id, exam.name)}>
                                        Delete
                                    </Button></td>
                                <td><Button variant="secondary" onClick={() => updateExam(exam.id)} className="ms-2">
                                        Update
                                    </Button></td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Exam</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete "{selectedExam}"? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Update Exam</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ExamForm 
                        operation="updateuser" 
                        examId={examUpdateId} 
                        Evalues={examUpdateData} 
                        onSuccess={handleUpdateSuccess}
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ExamList;