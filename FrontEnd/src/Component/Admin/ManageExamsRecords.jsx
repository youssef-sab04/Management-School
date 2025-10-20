import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import ExamsRecordList from './ExamsRecordList';
import ExamsRecordForm from '../Form/ExamsRecordForm';

export default function ManageExamsRecords() {
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
            Notes d'examens
          </Button>
          <Button 
            variant={activeTab === 'B' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('B')}
          >
            Ajouter une note
          </Button>
        </ButtonGroup>
      </div>
      <hr />
      <div className="cont">
        {activeTab === 'A' && <ExamsRecordList operation="update" />}
        {activeTab === 'B' && <ExamsRecordForm operation="create" />}
      </div>
    </div>
  );
}