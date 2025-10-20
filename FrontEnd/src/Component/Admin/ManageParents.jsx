import { Nav, Container, Button } from 'react-bootstrap';
import { ButtonGroup} from 'react-bootstrap';
import ParentList from './ParentList';
import ParentForm from '../Form/ParentCreate';

import { useState } from 'react';
export default function ManageParents() {

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
            Parents
          </Button>
          <Button 
            variant={activeTab === 'B' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('B')}
          >
            Create Parents
          </Button>
        </ButtonGroup>
      </div>
              <hr></hr>

      <div className="cont">
        {activeTab === 'A' && <ParentList operation="update" />}
        {activeTab === 'B' && <ParentForm operation="create" />}
      </div>
    </div>
    </>
  );
}