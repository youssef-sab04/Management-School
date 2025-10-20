import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import ClassForm from '../Form/ClassForm';
import ClassList from './ClassList'

export default function ManageClasses() {
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
            Classes
          </Button>
          <Button 
            variant={activeTab === 'B' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('B')}
          >
            Create Class
          </Button>
        </ButtonGroup>
      </div>
      <hr />
      <div className="cont">
        {activeTab === 'A' && <ClassList operation="update" />}
        {activeTab === 'B' && <ClassForm operation="create" />}
      </div>
    </div>
  );
}