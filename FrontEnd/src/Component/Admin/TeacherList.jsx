import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import TeacherApi from '../../service/api/student/TeacherApi';
import TeacherForm from '../Form/TeacherCreate';

const TeacherList = (props) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortField, setSortField] = useState('firstname');
    const [teachers, setTeachers] = useState([]);
    const [teacherDelete, setTeacherDelete] = useState({});
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [teacherUpdateData, setTeacherUpdateData] = useState(null);
    const [teacherUpdateId, setTeacherUpdateId] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const toggleSort = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const Col = [
        { "k": 1, "nom": "ID" },
        { "k": 2, "nom": "Firstname" },
        { "k": 3, "nom": "Lastname" },
        { "k": 4, "nom": "Date of birth" },
        { "k": 5, "nom": "Gender" },
        { "k": 6, "nom": "address" },
        { "k": 7, "nom": "phone" },
        { "k": 8, "nom": "Email" },
        { "k": 9, "nom": "Updated at" }
    ];

    useEffect(() => {
        TeacherApi.all().then((response) => {
            setTeachers(response.data.data);
        });
    }, []);

    const deleteTeacher = (id, firstname, lastname) => {
        setSelectedTeacher(firstname + " " + lastname);
        setTeacherDelete({ id, firstname, lastname });
        setShowModal(true);

    }
            console.log(teachers)


    const confirmDelete = async () => {
        try {
            await TeacherApi.delete(teacherDelete.id);
            TeacherApi.all().then((response) => {
                setTeachers(response.data.data);
            });
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    }

    const updateTeacher = (id) => {
        setTeacherUpdateId(id);
        const teacher = teachers.find(t => t.id === id);
        setTeacherUpdateData(teacher);
        setShowOffcanvas(true);
    }

    const handleUpdateSuccess = () => {
        setShowOffcanvas(false);
        TeacherApi.all().then((response) => {
            setTeachers(response.data.data);
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
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.id}>
                                <td>{teacher.id}</td>
                                <td>{teacher.firstname}</td>
                                <td>{teacher.lastname}</td>
                                <td>{teacher.date_of_birth}</td>
                                <td>{teacher.gender === 'm' ? 'Male' : 'Female'}</td>
                                <td>{teacher?.address}</td>
                                <td>{teacher?.phone}</td>
                                <td>{teacher.email}</td>
                                <td>{new Date(teacher.updated_at).toLocaleDateString('fr-FR')}</td>
                                
                                <td><Button variant="danger" onClick={() => deleteTeacher(teacher.id, teacher.firstname, teacher.lastname)}>
                                        Delete
                                    </Button></td>
                                    <td><Button variant="secondary" onClick={() => updateTeacher(teacher.id)} className="ms-2">
                                        Update
                                    </Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {selectedTeacher}? This action cannot be undone.
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
                    <Offcanvas.Title>Update Teacher</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <TeacherForm 
                        operation="updateuser" 
                        teacherId={teacherUpdateId} 
                        Tvalues={teacherUpdateData} 
                        onSuccess={handleUpdateSuccess}
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default TeacherList;