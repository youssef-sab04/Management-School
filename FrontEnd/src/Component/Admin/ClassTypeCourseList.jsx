import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import ClassTypeCourseApi from '../../service/api/student/ClassTypeCourseApi';
import ClassTypeCourseForm from '../Form/ClassTypeCourseForm';

const ClassTypeCourseList = (props) => {
    const [classTypeCourses, setClassTypeCourses] = useState([]);
    const [classTypeCourseDelete, setClassTypeCourseDelete] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedClassTypeCourse, setSelectedClassTypeCourse] = useState(null);
    const [classTypeCourseUpdateData, setClassTypeCourseUpdateData] = useState(null);
    const [classTypeCourseUpdateId, setClassTypeCourseUpdateId] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

 

    const Col = [
        { "k": 1, "nom": "ID" },
        { "k": 2, "nom": "Course" },
        { "k": 3, "nom": "Class" },
        { "k": 4, "nom": "Coefficient" },
        { "k": 5, "nom": "Updated At" }
    ];

    useEffect(() => {
        ClassTypeCourseApi.all().then((response) => {
            setClassTypeCourses(response.data.data);
        });
    }, []);

    const deleteClassTypeCourse = (id, courseName, className) => {
        setSelectedClassTypeCourse(`${courseName} - ${className}`);
        setClassTypeCourseDelete({ id, courseName, className });
        setShowModal(true);
    }

    const confirmDelete = async () => {
        try {
            await ClassTypeCourseApi.delete(classTypeCourseDelete.id);
            ClassTypeCourseApi.all().then((response) => {
                setClassTypeCourses(response.data.data);
            });
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting class type course:", error);
        }
    }
console.log(classTypeCourses)
    const updateClassTypeCourse = (id) => {
        setClassTypeCourseUpdateId(id);
        const classTypeCourse = classTypeCourses.find(ctc => ctc.id === id);
        setClassTypeCourseUpdateData(classTypeCourse);
        setShowOffcanvas(true);
    }

    const handleUpdateSuccess = () => {
        setShowOffcanvas(false);
        ClassTypeCourseApi.all().then((response) => {
            setClassTypeCourses(response.data.data);
        });
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classTypeCourses.map((classTypeCourse) => (
                            <tr key={classTypeCourse.id}>
                                <td>{classTypeCourse.id}</td>
                                <td>
                                    {classTypeCourse.course ? 
                                        `${classTypeCourse.course.name}` : 
                                        classTypeCourse.courses_id
                                    }
                                </td>
                                <td>
                                    {classTypeCourse.classe ? 
                                        `${classTypeCourse.classe.name} (${classTypeCourse.classe.code})` : 
                                        classTypeCourse.classe_id
                                    }
                                </td>
                                <td>{classTypeCourse.coef}</td>
                                <td>{new Date(classTypeCourse.updated_at).toLocaleDateString('fr-FR')}</td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteClassTypeCourse(
                                        classTypeCourse.id, 
                                        classTypeCourse.course?.name || 'Course', 
                                        classTypeCourse.classe?.name || 'Class'
                                    )}>
                                        Delete
                                    </Button>
                                    <Button variant="secondary" onClick={() => updateClassTypeCourse(classTypeCourse.id)} className="ms-2">
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Class Type Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete "{selectedClassTypeCourse}"? This action cannot be undone.
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
                    <Offcanvas.Title>Update Class Type Course</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ClassTypeCourseForm 
                        operation="updateuser" 
                        classTypeCourseId={classTypeCourseUpdateId} 
                        CTCvalues={classTypeCourseUpdateData} 
                        onSuccess={handleUpdateSuccess}
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ClassTypeCourseList;