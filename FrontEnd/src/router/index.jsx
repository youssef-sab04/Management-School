import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home.jsx";
import Login from "../page/Login.jsx";
import Register from "../page/Register.jsx";
import Users from "../page/Users.jsx";
import NotFound from "../page/NotFound.jsx";
import Layout from "../Layouts/Layout.jsx";
export const LOGIN_ROUTE = '/login'
export const ABOUT_ROUTE = '/about'
export const services_ROUTE = '/services'
export const functions_ROUTE = '/témoignages'
export const contact_ROUTE = '/contact'
export const stats_ROUTE = '/statistiques'








export const STUDENT_DASHBOARD_ROUTE = '/student/dashboard'
export const STUDENTRECORDS_DASHBOARD_ROUTE = '/student/records'


const ADMIN_BASE_ROUTE = '/admin'
export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE + '/dashboard'
export const ADMIN_MANAGE_PARENTS_ROUTE = ADMIN_BASE_ROUTE + '/manage-parents'
export const ADMIN_MANAGE_STUDENTS_ROUTE = ADMIN_BASE_ROUTE + '/manage-students'
export const ADMIN_MANAGE_TEACHERS_ROUTE = ADMIN_BASE_ROUTE + '/manage-teachers'
export const ADMIN_MANAGE_CLASSETYPE_ROUTE = ADMIN_BASE_ROUTE + '/manage-classe-type'
export const ADMIN_MANAGE_CLASSE_ROUTE = ADMIN_BASE_ROUTE + '/manage-classe'
export const ADMIN_MANAGE_COURSE_ROUTE = ADMIN_BASE_ROUTE + '/manage-course'
export const ADMIN_MANAGE_COURSECLASSTYPE_ROUTE = ADMIN_BASE_ROUTE + '/manage-course-classe-type'
export const ADMIN_MANAGE_STATS_ROUTE = ADMIN_BASE_ROUTE + '/manage-statistiques'




const TEATCHER_BASE_ROUTE = '/teacher'
export const ADMIN_MANAGE_Exam_ROUTE = TEATCHER_BASE_ROUTE + '/manage-exam'
export const ADMIN_MANAGE_Exam_RECORD_ROUTE = TEATCHER_BASE_ROUTE + '/manage-exam-record'
export const ADMIN_MANAGE_Contenu_cours_ROUTE = TEATCHER_BASE_ROUTE + '/manage-contenu-cours'


import About from "../page/about.jsx";
import { Services } from "../page/Services.jsx";
import { Functions } from "../page/Functions.jsx";
import { Contact } from "../page/Contact.jsx";
import { Counter } from "../page/Counter.jsx";













const  TEACHER_BASE_ROUTE = '/teacher'
export const TEACHER_DASHBOARD_ROUTE = TEACHER_BASE_ROUTE + '/dashboard'
import TeatcherDashboardLayout from "../Layouts/TeatcherDashboardLayout.jsx";
import TeatcherDashboard from "../Component/teatcher/TeatcherDashboard.jsx";

const  PARENT_BASE_ROUTE = '/parent'
export const PARENT_DASHBOARD_ROUTE = PARENT_BASE_ROUTE + '/dashboard'
import ParentDashboard from "../Component/Parent/ParentDashboard.jsx";
import ParentDashboardLayout from "../Layouts/ParentDashboardLayout.jsx";


import StudentDashboardLayout from "../Layouts/StudentDashboardLayout.jsx";
import GuestLayout from "../Layouts/GuestLayout.jsx";
import StudentDashboard from "../Component/Student/SrudentDashboard.jsx";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout.jsx";
import AdminDashboard from "../Component/Admin/AdminDashboard.jsx";
import ManageParents from "../Component/Admin/ManageParents.jsx";
import ManageStudents from "../Component/Admin/ManageStudents.jsx";
import ManageTeachers from "../Component/Admin/ManageTeachers.jsx";
import ManageClassTypes from "../Component/Admin/ManageClassTypes.jsx";
import ManageClasses from "../Component/Admin/ManageClasses.jsx";
import ManageCourses from "../Component/Admin/ManageCourses.jsx";
import ManageClassTypeCourses from "../Component/Admin/ManageClassTypeCourses.jsx";
import ManageExams from "../Component/Admin/ManageExams.jsx";
import ManageExamsRecords from "../Component/Admin/ManageExamsRecords.jsx";
import ManageContenuCours from "../Component/Admin/ManageContenuCours.jsx";
import Statistiques from "../Component/Admin/Statistiques.jsx";
import StudentListRecords from "../Component/Admin/StudentListRecords.jsx";

export const redirectToDashboard = (roleType) => {
  switch (roleType) {
    case 'student':
      return (STUDENT_DASHBOARD_ROUTE);
    case 'admin':
      return (ADMIN_DASHBOARD_ROUTE)
    case 'teacher':
      return (TEACHER_DASHBOARD_ROUTE)
    case 'parent':
      return (PARENT_DASHBOARD_ROUTE)
  }
}

export const router = createBrowserRouter([
 {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '*',
        element: <NotFound/>
      },
      {
        path: ABOUT_ROUTE,
        element: <About/>
      },
      {
        path:services_ROUTE,
        element: <Services/>
      },
        {
        path:functions_ROUTE,
        element: <Functions/>
      },
      {
        path:contact_ROUTE,
        element: <Contact/>
      },
      {
        path:stats_ROUTE,
        element: <Counter/>
      },



    ]
  },
  {
    element: <GuestLayout/>,
    children: [
      {
        path: LOGIN_ROUTE,
        element: <Login/>
      },
    ]
  },
  {
    element: <StudentDashboardLayout/>,
    children: [
      {
        path: STUDENT_DASHBOARD_ROUTE,
        element: <StudentDashboard/>
      },
      {
        path: STUDENTRECORDS_DASHBOARD_ROUTE,
        element: <StudentListRecords/>
      },
    ]
  },
  {
    element: <AdminDashboardLayout />,
    children: [
      {
        path: ADMIN_DASHBOARD_ROUTE,
        element: <AdminDashboard/>
      },
    
      {
        path: ADMIN_MANAGE_PARENTS_ROUTE,
        element: <ManageParents/>
      },
      {
        path: ADMIN_MANAGE_STUDENTS_ROUTE,
        element: <ManageStudents/>
      },
      {
        path: ADMIN_MANAGE_TEACHERS_ROUTE,
        element: <ManageTeachers/>
      },
      {
        path: ADMIN_MANAGE_CLASSETYPE_ROUTE,
        element: <ManageClassTypes/>
      },
      {
        path: ADMIN_MANAGE_CLASSE_ROUTE,
        element: <ManageClasses/>
      },
      {
        path: ADMIN_MANAGE_COURSE_ROUTE,
        element: <ManageCourses/>
      },
      {
        path: ADMIN_MANAGE_COURSECLASSTYPE_ROUTE,
        element: <ManageClassTypeCourses/>
      },
         {
        path: ADMIN_MANAGE_STATS_ROUTE,
        element: <Statistiques/>
      },
      


    ]
  },
  {
    element: <TeatcherDashboardLayout />,
    children: [
      {
        path: TEACHER_DASHBOARD_ROUTE,
        element: <TeatcherDashboard/>
      },
      {
        path: ADMIN_MANAGE_Exam_ROUTE,
        element: <ManageExams/>
      },
      {
        path: ADMIN_MANAGE_Exam_RECORD_ROUTE,
        element: <ManageExamsRecords/>
      },
      {
        path: ADMIN_MANAGE_Contenu_cours_ROUTE,
        element: <ManageContenuCours/>
      },
    
      
    ]
  },
  {
    element: <ParentDashboardLayout />,
    children: [
      {
        path: PARENT_DASHBOARD_ROUTE,
        element: <ParentDashboard/>
      },
      
    ]
  },
  
  
  
]);