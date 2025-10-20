import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import ContenuCoursForm from '../Form/ContenuCoursForm';
import ContenuCoursApi from '../../service/api/student/ContenuCoursApi';
import TeacherApi from '../../service/api/student/TeacherApi';

const ContenuCoursList = (props) => {
    const [contenuCours, setContenuCours] = useState([]);
    const [contenuCoursDelete, setContenuCoursDelete] = useState({});
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedContenuCours, setSelectedContenuCours] = useState(null);
    const [contenuCoursUpdateData, setContenuCoursUpdateData] = useState(null);
    const [contenuCoursUpdateId, setContenuCoursUpdateId] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [teachers , setTeatchers] =  useState(null);
        const [teacher , setTeatcher] =  useState(null);


    useEffect(() => {
        ContenuCoursApi.all().then((response) => {
            setContenuCours(response.data.data);
        });
    }, []);
      useEffect(() => {
        TeacherApi.allT().then((response) => {
            setTeatchers(response.data.data);
        });
    }, []);





    const deleteContenuCours = (id, title) => {
        setSelectedContenuCours(title);
        setContenuCoursDelete({ id, title });
        setShowModal(true);
    }

    const confirmDelete = async () => {
        try {
            await ContenuCoursApi.delete(contenuCoursDelete.id);
            ContenuCoursApi.all().then((response) => {
                setContenuCours(response.data.data);
            });
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting contenu cours:", error);
        }
    }
        console.log("ct" , contenuCours)


const findT = () =>{
  let Teach = teachers.find(t => t?.id == contenuCours?.teacher_id );
  console.log(Teach) }





 
    const updateContenuCours = (id) => {
        setContenuCoursUpdateId(id);
        const contenuCoursItem = contenuCours.find(cc => cc.id === id);
        setContenuCoursUpdateData(contenuCoursItem);
        setShowOffcanvas(true);
    }

    const handleUpdateSuccess = () => {
        setShowOffcanvas(false);
        ContenuCoursApi.all().then((response) => {
            setContenuCours(response.data.data);
        });
    };


    return (
        <>
           

            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Classe</th>
                            <th>Cours</th>
                            <th>Enseignant</th>
                            <th>Date modif</th>
                            <th>

                            </th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {contenuCours.map((contenuCoursItem) => (
                            <tr key={contenuCoursItem.id}>
                                <td>{contenuCoursItem.id}</td>
                                <td>{contenuCoursItem.title}</td>
                                <td>{contenuCoursItem.description}</td>
                                <td>{contenuCoursItem.classe?.name || contenuCoursItem.classe_id}</td>
                                <td>{contenuCoursItem.class_type_course?.course_name || contenuCoursItem.class_type_course_id}</td>
<td>
{
(
    
() => {
     const teacher = teachers?.find(t => t?.id == contenuCoursItem?.teacher_id);
     return teacher ? (teacher.firstname + " " +  teacher.lastname ) : "Non assigné";
   })
   ()
 // () => { ... } La fonction est déclarée ET exécutée immédiatement.
}
   
   </td>
                                <td>{new Date(contenuCoursItem.updated_at).toLocaleDateString('fr-FR')}</td>
                                
                                <td>

                                    <Button variant="secondary" onClick={() => updateContenuCours(contenuCoursItem.id)} className="ms-2">
                                        Modifier
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteContenuCours(contenuCoursItem.id, contenuCoursItem.title)}>
                                        Supprimer
                                    </Button>  
                                                                    </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Supprimer Contenu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer "{selectedContenuCours}" ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>

            <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Modifier Contenu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ContenuCoursForm 
                        operation="updateuser" 
                        contenuCoursId={contenuCoursUpdateId} 
                        CCvalues={contenuCoursUpdateData} 
                        onSuccess={handleUpdateSuccess}
                    />
                </Offcanvas.Body>
            </Offcanvas>
            
        </>
    );
}

export default ContenuCoursList;