import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import ClassApi from '../../service/api/student/ClassApi';
import ClassForm from '../Form/ClassForm';

const ClassList = (props) => {
    const [classes, setClasses] = useState([]);
    const [classDelete, setClassDelete] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [classUpdateData, setClassUpdateData] = useState(null);
    const [classUpdateId, setClassUpdateId] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);



    const Col = [
        { "k": 1, "nom": "ID" },
        { "k": 2, "nom": "Name" },
        { "k": 3, "nom": "Code" },
        { "k": 4, "nom": "Class Type" },
        { "k": 5, "nom": "Updated At" }
    ];

    useEffect(() => {
        ClassApi.all().then((response) => {
            setClasses(response.data.data);
        });
    }, []);

    const deleteClass = (id, name, code) => {
        setSelectedClass(name || code);
        setClassDelete({ id, name, code });
        setShowModal(true);
    }

    const confirmDelete = async () => {
        console.log(classDelete.id)
        try {
            await ClassApi.delete(classDelete.id);
            ClassApi.all().then((response) => {
                setClasses(response.data.data);
            });
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting class:", error);
        }
    }

    const updateClass = (id) => {
        setClassUpdateId(id);
        const classItem = classes.find(c => c.id === id);
        setClassUpdateData(classItem);
        setShowOffcanvas(true);
    }

    const handleUpdateSuccess = () => {
        setShowOffcanvas(false);
        ClassApi.all().then((response) => {
            setClasses(response.data.data);
        });
    };

    return (
        <>
            <div className="head">
               
            </div>

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
                        {classes.map((classItem) => (
                            <tr key={classItem.id}>
                                <td>{classItem.id}</td>
                                <td>{classItem.name || '-'}</td>
                                <td>{classItem.code}</td>
                                <td>
                                    {classItem.class_type ?
                                        `${classItem.class_type.name} (${classItem.class_type.code})` :
                                        classItem.class_type_id
                                    }
                                </td>
                                <td>{new Date(classItem.updated_at).toLocaleDateString('fr-FR')}</td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteClass(classItem.id, classItem.name, classItem.code)}>
                                        Delete
                                    </Button>
                                </td>
                                <td>

                                    <Button variant="secondary" onClick={() => updateClass(classItem.id)} className="ms-2">
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
                    <Modal.Title>Delete Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete "{selectedClass}"? This action cannot be undone.
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
                    <Offcanvas.Title>Update Class</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ClassForm
                        operation="updateuser"
                        classId={classUpdateId}
                        Cvalues={classUpdateData}
                        onSuccess={handleUpdateSuccess}
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ClassList;