import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import ClassTypeList from './ClassTypeList';
import ClassTypeForm from '../Form/ClassTypeCreate';

export default function ManageClassTypes() {
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
            Class Types
          </Button>
          <Button 
            variant={activeTab === 'B' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('B')}
          >
            Create Class Type
          </Button>
        </ButtonGroup>
      </div>
      <hr />
      <div className="cont">
        {activeTab === 'A' && <ClassTypeList operation="update" />}
        {activeTab === 'B' && <ClassTypeForm operation="create" />}
      </div>
    </div>
  );
}

/*



        */