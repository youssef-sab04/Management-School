import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import CourseList from './CourseList';
import CourseForm from '../Form/CourseForm';

export default function ManageCourses() {
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
            Courses
          </Button>
          <Button 
            variant={activeTab === 'B' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('B')}
          >
            Create Course
          </Button>
        </ButtonGroup>
      </div>
      <hr />
      <div className="cont">
        {activeTab === 'A' && <CourseList operation="update" />}
        {activeTab === 'B' && <CourseForm operation="create" />}
      </div>
    </div>
  );
}