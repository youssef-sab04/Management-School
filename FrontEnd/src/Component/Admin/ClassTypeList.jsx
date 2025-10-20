import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import ClassTypeForm from '../Form/ClassTypeCreate';
import ClassTypeApi from '../../service/api/student/ClassTypeApi';

const ClassTypeList = (props) => {
  
    const [classTypes, setClassTypes] = useState([]);
    const [classTypeDelete, setClassTypeDelete] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedClassType, setSelectedClassType] = useState(null);
    const [classTypeUpdateData, setClassTypeUpdateData] = useState(null);
    const [classTypeUpdateId, setClassTypeUpdateId] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);



    console.log(classTypes)

    const Col = [
        { "k": 1, "nom": "ID" },
        { "k": 2, "nom": "Name" },
        { "k": 3, "nom": "Code" },
        { "k": 4, "nom": "Updated At" }
    ];

    useEffect(() => {
        ClassTypeApi.all().then((response) => {
            setClassTypes(response.data.data);
        });
    }, []);

    const deleteClassType = (id, name) => {
        setSelectedClassType(name);
        setClassTypeDelete({ id, name });
        setShowModal(true);
    }

    const confirmDelete = async () => {
        try {
            await ClassTypeApi.delete(classTypeDelete.id);
            ClassTypeApi.all().then((response) => {
                setClassTypes(response.data.data);
            });
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting class type:", error);
        }
    }

    const updateClassType = (id) => {
        setClassTypeUpdateId(id);
        const classType = classTypes.find(ct => ct.id === id);
        setClassTypeUpdateData(classType);
        setShowOffcanvas(true);
    }

    const handleUpdateSuccess = () => {
        setShowOffcanvas(false);
        ClassTypeApi.all().then((response) => {
            setClassTypes(response.data.data);
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
                        {classTypes.map((classType) => (
                            <tr key={classType.id}>
                                <td>{classType.id}</td>
                                <td>{classType.name}</td>
                                <td>{classType.code}</td>
                                <td>{new Date(classType.updated_at).toLocaleDateString('fr-FR')}</td>
                                
                                <td><Button variant="danger" onClick={() => deleteClassType(classType.id, classType.name)}>
                                        Delete
                                    </Button></td>
                                <td><Button variant="secondary" onClick={() => updateClassType(classType.id)} className="ms-2">
                                        Update
                                    </Button></td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Class Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete "{selectedClassType}"? This action cannot be undone.
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
                    <Offcanvas.Title>Update Class Type</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ClassTypeForm 
                        operation="updateuser" 
                        classTypeId={classTypeUpdateId} 
                        CTvalues={classTypeUpdateData} 
                        onSuccess={handleUpdateSuccess}
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ClassTypeList;