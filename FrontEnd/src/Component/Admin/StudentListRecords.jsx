import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Offcanvas  , Alert} from 'react-bootstrap';
import ExamRecordApi from '../../service/api/student/ExamRecordApi';
import DeclarationApi from '../../service/api/student/DeclarationApi';
import UserApi from '../../service/api/student/UsersApi';


const StudentListRecords = () => {

    const [ExamsRecords, setExamsRecords] = useState("")
    const [Show , setshow ] = useState(false)
    const [error , setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user , setUser] = useState("")

      useEffect(() => {
  
     UserApi.getUser().then(({ data }) => {
        console.log(data)
      setUser(data?.user);

    })
  }, []);
    


const [formData, setFormData] = useState({
    exams_record_id: '',
    exam_id: '', 
    classe_id: '',
    user_id: '',
    teacher_id: '',
    Declaration: '',
    status:'en_cours'
});
   useEffect(() => {
    ExamRecordApi.GetRecord(user?.id).then((response) => {
        setExamsRecords(response?.data);
    });

}, [user]);

const  Declarer = (a , b ,c ,d  , e , f ) =>{
setshow(true)
setFormData({
        exams_record_id: a,
        exam_id: b,
        user_id: c,
        teacher_id: d, 
        classe_id: e,
        examenNom : f,
        status:'en_cours'

    })
}

const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
    const response = await DeclarationApi.create(formData);


    console.log(formData)
    alert("Declaration faite par succes")
    setFormData({
    exams_record_id: '',
    exam_id: '', 
    classe_id: '',
    user_id: '',
    teacher_id: '',
    Declaration: '',})
    setshow(false)

      
    } catch (error) {
          setError("Erreur lors de la déclaration");

    } finally {
    }

}

// Trouver les infos de l'exam pour chaque record


    return (
        <>

            <div className="table-responsive">
            <Button 
            variant='outline-primary'
            className="me-3 mb-5"
          >  Records </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nom examen </th>
                            <th>Note</th>
                            <th>comment</th>
                            <th>Nom de classe</th>
                            <th>Nom de Teacher</th>   
                        </tr>

                    </thead>
                    <tbody>

                        {ExamsRecords && ExamsRecords.map((e) => (
                            <tr key={e.id}>
                                <td>{e?.Nom_exam}</td>
                                <td>{e?.note}</td>
                                <td>{e?.comment}</td>
                                <td>{e?.class_name}</td>
                                <td>{e?.teacher_firstname}  {e?.teacher_lastname}</td>
                                <td><Button variant='danger' onClick={() => Declarer(e?.id , e?.exam_id , e?.user_id , e?.teacherid , e?.class_id , e?.Nom_exam)}>Declarer</Button></td>






                            </tr>

                        )

                        )}


                    </tbody>
                </Table>
            </div>

            <Offcanvas show={Show} onHide={() => setshow(false)}  placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Create Declaration</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={handleSubmit}>
                   <Form.Group className="mb-3">
                           <Form.Label>Nom Examen</Form.Label>
                           <Form.Control
                             type="text"
                             value={formData?.examenNom}
                             disabled={true}
                           />
                           
                         </Form.Group>
                         <Form.Group className="mb-3">
                           <Form.Label>Declaration</Form.Label>
                           <Form.Control
                             type="text"
                             value={formData.Declaration}
                             onChange={(e)=>{ setFormData({...formData, Declaration: e.target.value})
}}
                             
                           />
                           
                         </Form.Group>
                         <Button type="submit" >
                                 Sumbmit
                               </Button>
                               {error && <Alert className='mt-3' variant='danger'>{error}</Alert>}
                         </Form>
                </Offcanvas.Body>
            </Offcanvas>




        </>
    );
}

export default StudentListRecords;