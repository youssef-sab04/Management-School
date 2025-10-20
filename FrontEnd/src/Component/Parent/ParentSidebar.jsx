import AddIcon from '@mui/icons-material/Add';
import Nav from 'react-bootstrap/Nav';
import { PARENT_DASHBOARD_ROUTE } from '../../router';


export default function ParentSidebar() {
  return (
     <div className="spotify-menu">
      <div className="menu-section">
        <div className="menu-title">Menu Principal</div>
        <Nav className="flex-column">
          <Nav.Link href={ PARENT_DASHBOARD_ROUTE } className="menu-item active d-flex align-items-center">
            <AddIcon className="menu-icon" />
            <span>Parent sidebar</span>
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
