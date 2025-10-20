import { Nav, Container, Button } from 'react-bootstrap';
import { ButtonGroup} from 'react-bootstrap';
import { useState } from 'react';
import StudentList from './StudentList';
import StudentForm from '../Form/StudentCreate';
export default function ManageStudents() {

  const [activeTab, setActiveTab] = useState('B'); // B par défaut

  return (
     <>
      <div className="Mp">
      <div className="optt">
        <ButtonGroup>
          <Button 
            variant={activeTab === 'A' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('A')}
            className="me-3"
          >
            Students
          </Button>
          <Button 
            variant={activeTab === 'B' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('B')}
          >
            Create Student
          </Button>
        </ButtonGroup>
      </div>
              <hr></hr>

      <div className="cont">
        {activeTab === 'A' && <StudentList/> }
        {activeTab === 'B' &&  <StudentForm operation="create"/>}
      </div>
    </div>
    </>
  );
}

//  {activeTab === 'B' && <ParentForm operation="create" />}
