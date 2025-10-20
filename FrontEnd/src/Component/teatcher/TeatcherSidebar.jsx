import AddIcon from '@mui/icons-material/Add';
import Nav from 'react-bootstrap/Nav';
import { ADMIN_MANAGE_Contenu_cours_ROUTE, ADMIN_MANAGE_Exam_ROUTE } from '../../router';
import { ADMIN_MANAGE_Exam_RECORD_ROUTE } from '../../router';

export default function TeatcherSidebar() {
  return (
     <div className="spotify-menu Adminside">
  <h2>Espace Enseignant</h2>

  <div className="menu-section SA">
    <div className="menu-title">Menu Principal</div>
    <Nav className="flex-column">
     
      <Nav.Link href={ADMIN_MANAGE_Exam_ROUTE}  className="menu-item active d-flex align-items-center BA">
        <AddIcon className="menu-icon" />
        <span>Créer Examen</span>
      </Nav.Link>
      <Nav.Link href={ADMIN_MANAGE_Exam_RECORD_ROUTE} className="menu-item active d-flex align-items-center BA">
        <AddIcon className="menu-icon" />
        <span>Gérer Notes</span>
      </Nav.Link>
      <Nav.Link href={ADMIN_MANAGE_Contenu_cours_ROUTE} className="menu-item active d-flex align-items-center BA">
        <AddIcon className="menu-icon" />
        <span>Contenu Cours</span>
      </Nav.Link>
    </Nav>
  </div>
</div>
  );
}


