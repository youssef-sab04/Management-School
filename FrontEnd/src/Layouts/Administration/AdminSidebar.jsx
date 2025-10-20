import AddIcon from '@mui/icons-material/Add';
import Nav from 'react-bootstrap/Nav';
import { ADMIN_MANAGE_PARENTS_ROUTE } from '../../router';
import { ADMIN_MANAGE_STUDENTS_ROUTE } from '../../router';
import { ADMIN_MANAGE_TEACHERS_ROUTE } from '../../router';
import { ADMIN_MANAGE_CLASSETYPE_ROUTE } from '../../router';
import { ADMIN_MANAGE_CLASSE_ROUTE } from '../../router';
import { ADMIN_MANAGE_COURSE_ROUTE } from '../../router';
import { ADMIN_MANAGE_COURSECLASSTYPE_ROUTE } from '../../router';
import { ADMIN_MANAGE_STATS_ROUTE } from '../../router';


export default function AdminSidebar() {
  return (
    <div className="spotify-menu Adminside">
              <h2>Espace Admin</h2>

      <div className="menu-section SA">
        <div className="menu-title">Menu Principal</div>
        <Nav className="flex-column">
          <Nav.Link href={ADMIN_MANAGE_PARENTS_ROUTE} className="menu-item active d-flex align-items-center BA">
            <AddIcon className="menu-icon" />
            <span>Create Parent</span>
          </Nav.Link>
          <Nav.Link href={ADMIN_MANAGE_STUDENTS_ROUTE} className="menu-item active d-flex align-items-center BA">
            <AddIcon className="menu-icon" />
            <span>Create Student</span>
          </Nav.Link>
          <Nav.Link href={ADMIN_MANAGE_TEACHERS_ROUTE} className="menu-item active d-flex align-items-center BA">
            <AddIcon className="menu-icon" />
            <span>Create Teatcher</span>
          </Nav.Link>
          <Nav.Link href={ADMIN_MANAGE_CLASSETYPE_ROUTE} className="menu-item active d-flex align-items-center BA">
            <AddIcon className="menu-icon" />
            <span>Create Classe type</span>
          </Nav.Link>
          <Nav.Link href={ADMIN_MANAGE_CLASSE_ROUTE} className="menu-item active d-flex align-items-center BA">
            <AddIcon className="menu-icon" />
            <span>Create Classe </span>
          </Nav.Link>
          <Nav.Link href={ADMIN_MANAGE_COURSE_ROUTE} className="menu-item active d-flex align-items-center BA">
            <AddIcon className="menu-icon" />
            <span>Create Coursse </span>
          </Nav.Link>
          <Nav.Link href={ADMIN_MANAGE_COURSECLASSTYPE_ROUTE} className="menu-item active d-flex align-items-center BA">
            <AddIcon className="menu-icon" />
            <span>Create Coursse Classe Type </span>
          </Nav.Link>
          <Nav.Link href={ADMIN_MANAGE_STATS_ROUTE} className="menu-item active d-flex align-items-center BA">
            <AddIcon className="menu-icon" />
            <span>Statistiques </span>
          </Nav.Link>

        </Nav>
      </div>
    </div>
  );
}


