import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import ParentApi from '../../service/api/student/ParentApi';
import ParentForm from '../Form/ParentCreate';

const ParentList = (props) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortField, setSortField] = useState('firstname');
    const [parents, setParents] = useState([]);
    const [parentDelete, setParentDelete] = useState({});

    const [filter, setFilter] = useState('');
    const [Show, setShowModal] = useState(false);
    const [selectedParent, setSelectedParent] = useState(null);

    const [parentUpdateData, setParentUpdateData] = useState(null);
    const [ParentUpdate, setParentUpdate] = useState(null);

    //
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const toggleSort = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        console.log(sortDirection);
    };

    const Col = [
        { "k": 1, "nom": "ID" },
        { "k": 2, "nom": "Firstname" },
        { "k": 3, "nom": "Lastname" },
        { "k": 4, "nom": "Date of birth" },
        { "k": 5, "nom": "Gender" },
        { "k": 6, "nom": "Address" },
        { "k": 7, "nom": "Phone" },
        { "k": 8, "nom": "Email" },
        { "k": 9, "nom": "Updated at" }
    ];

    useEffect(() => {

        ParentApi.all().then((response) => {
            setParents(response.data.data);

        })

    }, []);

    useEffect(() => {
        console.log(filter, sortField);
    }, [filter, sortField]);

    const Deletparent = (id, f, l) => {
        //console.log("delete", id);
        setSelectedParent(f + " " + l);
        setParentDelete({ "id": id, "f": f, "l": l });


        setShowModal(true);
    }

    const DeletParent = async () => {
        console.log("Delete", parentDelete.id, parentDelete.f, parentDelete.l);

        try {
            console.log("Deleted", parentDelete.id);

            const response = await ParentApi.delete(parentDelete.id);
            console.log("Response", response);
            console.log("data", response.data);

            alert("Parent deleted succefully")



            // Recharger la liste après suppression
            ParentApi.all().then((response) => {
                setParents(response.data.data);

            });

            setShowModal(false);
            console.log("Parent deleted successfully", parentDelete.id);
        } catch (error) {
            console.error("There was an error!", error);
        }

    }

    const UpdateParent = (id) => {
        console.log("Update", id);
        handleShow();
        setParentUpdate(id);
        const P = parents.find(p => p.id === id)
        setParentUpdateData(P);


    }
    const handleUpdateSuccess = () => {
        handleClose();

        ParentApi.all().then((response) => {
            setParents(response.data.data);
        });
    };

    return (
        <>
            <div className="table-custom">
    <div className="table-header-custom">
       
    </div>
    
    <div className="table-container-custom">
        <Table striped bordered hover className="table-custom-style">
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
                {parents.map((parent) => (
                    <tr key={parent.id}>
                        <td>{parent.id}</td>
                        <td>{parent.firstname}</td>
                        <td>{parent.lastname}</td>
                        <td>{parent.date_of_birth}</td>
                        <td>{parent.gender}</td>
                        <td>{parent.address}</td>
                        <td>{parent.phone}</td>
                        <td>{parent.email}</td>
                        <td>{new Date(parent.date_of_birth).toLocaleDateString('fr-FR')}</td>
                        <td>
                            <Button 
                                variant="danger" 
                                onClick={() => Deletparent(parent.id, parent.firstname, parent.lastname)}
                                className="btn-custom-danger"
                            >
                                Delete
                            </Button>
                        </td>
                        <td>
                            <Button 
                                variant="secondary" 
                                onClick={() => UpdateParent(parent.id)}
                                className="btn-custom-secondary"
                            >
                                Update
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>

    {Show &&
        <Modal className='modal-custom' show={true} centered>
            <Modal.Header>
                <Modal.Title>Are you absolutely sure to delete {selectedParent} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This action cannot be undone. This will permanently delete the parent account and remove their data from our servers.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => DeletParent()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    }

    <Offcanvas className='offcanvas-custom' show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Update Parent</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ParentForm 
                operation="updateuser" 
                parentId={ParentUpdate} 
                Pvalues={parentUpdateData} 
                onSuccess={handleUpdateSuccess}
            />
        </Offcanvas.Body>
    </Offcanvas>
</div>
        </>
    );
}

export default ParentList;
