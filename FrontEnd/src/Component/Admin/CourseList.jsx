import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import CourseApi from '../../service/api/student/CourseApi';
import CourseForm from '../Form/CourseForm';

const CourseList = (props) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [courses, setCourses] = useState([]);
    const [courseDelete, setCourseDelete] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseUpdateData, setCourseUpdateData] = useState(null);
    const [courseUpdateId, setCourseUpdateId] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);



    const Col = [
        { "k": 1, "nom": "ID" },
        { "k": 2, "nom": "Name" },
        { "k": 3, "nom": "Description" },
        { "k": 4, "nom": "Created At" }
    ];

    useEffect(() => {
        CourseApi.all().then((response) => {
            setCourses(response.data.data);
        });
    }, []);

    const deleteCourse = (id, name) => {
        setSelectedCourse(name);
        setCourseDelete({ id, name });
        setShowModal(true);
    }

    const confirmDelete = async () => {
        try {
            await CourseApi.delete(courseDelete.id);
            CourseApi.all().then((response) => {
                setCourses(response.data.data);
            });
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    }

    const updateCourse = (id) => {
        setCourseUpdateId(id);
        const course = courses.find(c => c.id === id);
        setCourseUpdateData(course);
        setShowOffcanvas(true);
    }

    const handleUpdateSuccess = () => {
        setShowOffcanvas(false);
        CourseApi.all().then((response) => {
            setCourses(response.data.data);
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
                            <th></th>
                                                        <th></th>
                                                         <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.id}</td>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>{new Date(course.created_at).toLocaleDateString('fr-FR')}</td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteCourse(course.id, course.name)}>
                                        Delete
                                    </Button></td> 
                                      <td>
                                    <Button variant="secondary" onClick={() => updateCourse(course.id)} className="ms-2">
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
                    <Modal.Title>Delete Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete "{selectedCourse}"? This action cannot be undone.
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
                    <Offcanvas.Title>Update Course</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CourseForm 
                        operation="updateuser" 
                        courseId={courseUpdateId} 
                        Cvalues={courseUpdateData} 
                        onSuccess={handleUpdateSuccess}
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default CourseList;