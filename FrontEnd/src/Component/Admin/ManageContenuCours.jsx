import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import ContenuCoursList from './ContenuCoursList';
import ContenuCoursForm from '../Form/ContenuCoursForm'

export default function ManageContenuCours() {
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
            Contenus Cours
          </Button>
          <Button 
            variant={activeTab === 'B' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('B')}
          >
            Ajouter Contenu
          </Button>
        </ButtonGroup>
      </div>
      <hr />
      <div className="cont">
        {activeTab === 'A' && <ContenuCoursList operation="update" />}
        {activeTab === 'B' && <ContenuCoursForm operation="create" />}
      </div>
    </div>
  );
}