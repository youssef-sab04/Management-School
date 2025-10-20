import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import ExamRecordApi from '../../service/api/student/ExamRecordApi';
import ExamsRecordForm from '../Form/ExamsRecordForm';

const ExamsRecordList = (props) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [examsRecords, setExamsRecords] = useState([]);
    const [examsRecordDelete, setExamsRecordDelete] = useState({});
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedExamsRecord, setSelectedExamsRecord] = useState(null);
    const [examsRecordUpdateData, setExamsRecordUpdateData] = useState(null);
    const [examsRecordUpdateId, setExamsRecordUpdateId] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const toggleSort = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        ExamRecordApi.all().then((response) => {
            setExamsRecords(response.data.data);
        });
    }, []);

    const deleteExamsRecord = (id, examName, studentName) => {
        setSelectedExamsRecord(`${examName} - ${studentName}`);
        setExamsRecordDelete({ id, examName, studentName });
        setShowModal(true);
    }

    const confirmDelete = async () => {
        try {
            await ExamRecordApi.delete(examsRecordDelete.id);
            ExamRecordApi.all().then((response) => {
                setExamsRecords(response.data.data);
            });
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting exams record:", error);
        }
    }

    const updateExamsRecord = (id) => {
        setExamsRecordUpdateId(id);
        const examsRecord = examsRecords.find(er => er.id === id);
        setExamsRecordUpdateData(examsRecord);
        setShowOffcanvas(true);
    }

    const handleUpdateSuccess = () => {
        setShowOffcanvas(false);
        ExamRecordApi.all().then((response) => {
            setExamsRecords(response.data.data);
        });
    };

    return (
        <>
           

            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Examen</th>
                            <th>Élève</th>
                            <th>
                                Note
                               
                            </th>
                            <th>Commentaire</th>
                            <th>Date modif.</th>
                            <th></th>
                                                        <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {examsRecords.map((examsRecord) => (
                            <tr key={examsRecord.id}>
                                <td>{examsRecord.id}</td>
                                <td>{examsRecord.exam?.name || examsRecord.exam_id}</td>
                                <td>
                                    {examsRecord.user ? 
                                        `${examsRecord.user.firstname} ${examsRecord.user.lastname}` : 
                                        examsRecord.user_id
                                    }
                                </td>
                                <td>{examsRecord.note}/20</td>
                                <td>{examsRecord.comment}</td>
                                <td>{new Date(examsRecord.updated_at).toLocaleDateString('fr-FR')}</td>
                                <td>
                                    <Button variant="danger" onClick={() => deleteExamsRecord(
                                        examsRecord.id, 
                                        examsRecord.exam?.name || 'Exam', 
                                        examsRecord.user ? `${examsRecord.user.firstname} ${examsRecord.user.lastname}` : 'Student'
                                    )}>
                                        Supprimer
                                    </Button>
                                    </td>
                                     <td>
                                    <Button variant="secondary" onClick={() => updateExamsRecord(examsRecord.id)} className="ms-2">
                                        Modifier
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Supprimer la note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer "{selectedExamsRecord}" ?
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
                    <Offcanvas.Title>Modifier la note</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ExamsRecordForm 
                        operation="updateuser" 
                        examsRecordId={examsRecordUpdateId} 
                        ERvalues={examsRecordUpdateData} 
                        onSuccess={handleUpdateSuccess}
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ExamsRecordList;