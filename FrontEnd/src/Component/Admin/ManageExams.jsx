import { Button, ButtonGroup } from 'react-bootstrap';
import ExamList from './ExamList';
import ExamForm from '../Form/ExamForm';
import { useState } from 'react';

export default function ManageExams() {
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
            Exams
          </Button>
          <Button 
            variant={activeTab === 'B' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('B')}
          >
            Create Exam
          </Button>
        </ButtonGroup>
      </div>
      <hr />
      <div className="cont">
        {activeTab === 'A' && <ExamList operation="update" />}
        {activeTab === 'B' && <ExamForm operation="create" />}
      </div>
    </div>
  );
}