//StudentAdminSidebar
import { Nav } from "react-bootstrap";
import { STUDENTRECORDS_DASHBOARD_ROUTE } from "../../router";
import AddIcon from '@mui/icons-material/Add';

export default function StudentAdminSidebar() {
  return (
    <div className="spotify-menu Adminside">
        <h2>Espace Etudiant</h2>

      <div className="menu-section SA">
        <div className="menu-title">Menu Principal</div>
        <Nav className="flex-column">
          <Nav.Link href={STUDENTRECORDS_DASHBOARD_ROUTE} className="menu-item active d-flex align-items-center BA">
            <AddIcon className="menu-icon" />
            <span>Show Records</span>
          </Nav.Link>
          
        </Nav>
      </div>
    </div>
  );
}

