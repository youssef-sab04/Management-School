import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import ClassTypeCourseList from './ClassTypeCourseList';
import ClassTypeCourseForm from '../Form/ClassTypeCourseForm';
export default function ManageClassTypeCourses() {
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
            Class Type Courses
          </Button>
          <Button 
            variant={activeTab === 'B' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('B')}
          >
            Create Class Type Course
          </Button>
        </ButtonGroup>
      </div>
      <hr />
      <div className="cont">
        {activeTab === 'A' && <ClassTypeCourseList operation="update" />}
        {activeTab === 'B' && <ClassTypeCourseForm operation="create" />}
      </div>
    </div>
  );
}