import { useUserContext } from "../../Content/StudentContext";
import { Outlet } from "react-router-dom";
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Navbar , Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
export default function  AdminDashboard() {
  const {user} = useUserContext();

    console.log(user)

  return (
    <>
      <Table className="tab tabround" striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Latname</th>


            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user?.id}</td>
              <td>{user?.firstname}</td>
              <td>{user?.lastname}</td>


            </tr>


          </tbody>
        </Table>

    </>
  );
}