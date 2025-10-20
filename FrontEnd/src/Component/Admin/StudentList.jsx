import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import ParentForm from '../Form/StudentCreate';
import StudentApi from '../../service/api/student/StudentApi';
const StudentList = (props) => {

    const [user, setUsers] = useState([]);
    const [userDelete, setUserDelete] = useState({});

    const [selectedUser, setSelectedUser] = useState(null);


    const [show, setShowModal] = useState(false);

    const [StudentUpdateData, setStudentUpdateData] = useState(null);
    const [StudentUpdate, setStudentUpdate] = useState(null);

     const [Show, setShow] = useState(false);
    
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);







    const Col = [
        { "k": 1, "nom": "ID" },
        { "k": 2, "nom": "Firstname" },
        { "k": 3, "nom": "Lastname" },
        { "k": 4, "nom": "Date of birth" },
        { "k": 5, "nom": "Gender" },
        { "k": 6, "nom": "Email" },
        { "k": 7, "nom": "bloodType" },
        { "k": 8, "nom": "Updated at" }
    ];

    useEffect(() => {

        StudentApi.all().then((response) => {
            setUsers(response?.data?.data);

        })

    }, []);
    console.log(user);


    const Deletparent = (id, f, l) => {
        setSelectedUser(f + " " + l);

        setShowModal(true);
        setUserDelete({ "id": id, "f": f, "l": l });
        console.log("delete stuudent", userDelete.id);
    }



    const DeletParent = async () => {
        console.log("Delete", userDelete.id, userDelete.f, userDelete.l);


        try {
            console.log("Deleted", userDelete.id);


            const response = await StudentApi.delete(userDelete.id);
            console.log("Response", response);
            console.log("data", response.data);
            alert('Student deleted successfully!');



            StudentApi.all().then((response) => {
            setUsers(response.data.data);

            });

            setShowModal(false);
            console.log("Parent deleted successfully", parentDelete.id);
        } catch (error) {
            console.error("There was an error!", error);
        }

    }
    const UpdateStudent = (id) => {
        console.log("Update", id);
        handleShow();
        setStudentUpdate(id);
        const P = user.find(p => p.id === id)
        setStudentUpdateData(P);


    }
    const handleUpdateSuccess = () => {
        handleClose();

        StudentApi.all().then((response) => {
            setUsers(response.data.data);
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
                        {user.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.firstname}</td>
                                <td>{u.lastname}</td>
                                <td>{new Date(u.date_of_birth).toLocaleDateString('fr-FR')}</td>
                                <td>{u.email}</td>
                                <td>{u.gender}</td>
                                <td>{u.blood_type}</td>
                                <td>{new Date(u.updated_at).toLocaleDateString('fr-FR')}</td>
                                <td><Button variant="danger" onClick={() => Deletparent(u.id, u.firstname, u.lastname)}>Delete</Button></td>
                                <td><Button variant="secondary" onClick={() => UpdateStudent(u.id)} >Update</Button></td>


                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div

                >

                </div>
            </div>
            {show &&
                <Modal className='Modal' show={true} centered>
                    <Modal.Header >
                        <Modal.Title>Are you absolutely sure to delete ? {selectedUser} </Modal.Title>
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
                </Modal>}

            <Offcanvas className='Offc' show={Show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Update Student </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ParentForm operation="updateuser" studentId={StudentUpdate} Pvalues={StudentUpdateData} onSuccess={handleUpdateSuccess}
                    />
                </Offcanvas.Body>
            </Offcanvas>




        </>
    );
}

export default StudentList;

