import AddIcon from '@mui/icons-material/Add';
import Nav from 'react-bootstrap/Nav';
import { ADMIN_MANAGE_PARENTS_ROUTE } from '../../router';


export default function AdminSidebar() {
  return (
     <div className="spotify-menu">
      <div className="menu-section">
        <div className="menu-title">Menu Principal</div>
        <Nav className="flex-column">
          <Nav.Link href={ ADMIN_MANAGE_PARENTS_ROUTE } className="menu-item active d-flex align-items-center">
            <AddIcon className="menu-icon" />
            <span>Admin sidebar</span>
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}
/*

<div className="menu-item active">
          <AddIcon className="menu-icon" />
          <span>Create Parent</span>
        </div>
        */
