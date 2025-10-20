import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import TeacherList from './TeacherList';
import TeacherForm from '../Form/TeacherCreate';
export default function ManageTeachers() {
  const [activeTab, setActiveTab] = useState('B');

  return (
    <div className="Mp">
      <div className="optt">
        <ButtonGroup>
          <Button 
            variant={activeTab === 'A' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('A')}
            className="me-3"
          >
            Teachers
          </Button>
          <Button 
            variant={activeTab === 'B' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('B')}
          >
            Create Teacher
          </Button>
        </ButtonGroup>
      </div>
      <hr />
   

      <div className="cont">
        {activeTab === 'A' && <TeacherList operation="update" />}
        {activeTab === 'B' && <TeacherForm operation="create" />}
        
      </div>
    

    </div>
  );
}

/*
{activeTab === 'A' && <TeacherList operation="update" />}
        {activeTab === 'B' && <TeacherForm operation="create" />}
*/