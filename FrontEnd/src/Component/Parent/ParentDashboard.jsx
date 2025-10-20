import { useUserContext } from "../../Content/StudentContext";
import { Outlet } from "react-router-dom";
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Navbar , Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
export default function  ParentDashboard() {
  const {user} = useUserContext();

  return (
    <>
      <Table className=" tab" striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Fist Name</th>
              <th>Last Name</th>


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