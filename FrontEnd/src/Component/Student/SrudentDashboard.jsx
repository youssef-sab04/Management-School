//StudentDashboardLayout
import { Outlet } from "react-router-dom";
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Navbar , Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { useUserContext } from "../../Content/StudentContext";
import React , {useState , useEffect} from "react";
import ClassApi from "../../service/api/student/ClassApi";
import ClassTypeApi from "../../service/api/student/ClassTypeApi";

export default function StudentDashboard() {
  const {user} = useUserContext();
    const [classes , setclasses] = useState(null);
      useEffect(() => {
        ClassApi.all().then((response) => {
        setclasses(response.data.data);
        });
    }, []);

    console.log(classes)
  return (
    <>
      <Table className="tab tabround" striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Name</th>
              <th>Classe</th>
              <th>Email</th>


            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user?.id}</td>
              <td>{user?.firstname}</td>
              <td>{user?.lastname}</td>
              <td>
{
(
    
() => {
     const classe = classes?.find(t => t?.id == user?.classe_id);
     return classe ? (classe?.name + "  (" + classe?.code +")"  ) : "";
   })
   ()
}
   
   </td>
              <td>{user?.email}</td>


            </tr>
            


          </tbody>
        </Table>

    </>
  );
}