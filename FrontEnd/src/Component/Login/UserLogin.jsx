import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import React, { useState, useEffect } from 'react';
import { axiosClient } from '../../api/axios.js';
import { useNavigate } from 'react-router-dom';
import { PARENT_DASHBOARD_ROUTE, STUDENT_DASHBOARD_ROUTE } from '../../router/index.jsx';
import { useUserContext } from '../../Content/StudentContext.jsx';
import { ADMIN_DASHBOARD_ROUTE } from '../../router/index.jsx';
import { TEACHER_DASHBOARD_ROUTE } from '../../router/index.jsx';
import educ from './educ.jpg'



const StudentLogin = () => {
  const Navigate = useNavigate();
  const [emaill, setEmail] = useState('');
  const [passwordd, setPassword] = useState('');

  const { Login, setUser, setAuthenticated, Authenticated, logout, setToken } = useUserContext();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: ''
  });




  const Valider = async (e) => {
    e.preventDefault();


    setEmailError('');
    setPasswordError('');
    setSuccessMessage('');

    let valid = true;
    if (emaill === "") {
      setEmailError('Email is required');
      valid = false;
    }

    if (passwordd === "") {
      setPasswordError('Password is required');
      valid = false;
    } else if (passwordd.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      valid = false;
    }
    if (valid) {
      setValues({ email: emaill, password: passwordd });

    }


    if (!valid) return;



    try {
      // Ajout de logs pour déboguer
      console.log('Tentative de connexion avec:', { emaill, passwordd });

      const response = await Login(emaill, passwordd);

      if (response.status === 200 || response.status === 204) {
        const { role } = response.data.user;
        const { Token } = response?.data?.token;
       // setUser(response.data);
         console.log("role" , role)
        console.log("token" , response.data.token)


        if (response.data.token) setToken(response.data.token)

        setAuthenticated(true);


        switch (role) {
          case 'student':
            setSuccessMessage("Connecte tant que  Etudiant")
                        setTimeout(() => {

            Navigate(STUDENT_DASHBOARD_ROUTE);
                        }, 2000);

            break;
          case 'admin':
            setSuccessMessage("Connecte tant que : Admin ")


            setTimeout(() => {
              Navigate(ADMIN_DASHBOARD_ROUTE);

            }, 2000);

            break;
          case 'teacher':
               setSuccessMessage("Connecte tant que  Teatcher")
                        setTimeout(() => {

            Navigate(TEACHER_DASHBOARD_ROUTE);
                        }, 2000);


            break;
          case 'parent':
             setSuccessMessage("Connecte tant que  Parent")
                        setTimeout(() => {

            Navigate(PARENT_DASHBOARD_ROUTE);
                        }, 2000);
            break;
          default:
            console.warn(`Role inconnu: ${role}`);
            break;

        }



      }


    } catch (error) {
      console.error('Erreur détaillée:', error.response?.data);
      setPasswordError(error.response?.data?.message || "Données invalides");
    }











  };



  return (
   <>
      <div className="login-modern">
        <div className="login-img-modern">
          <img
            src={educ}
            alt="Y-High School Logo"
            className="educ-img"
          />
        </div>
        <Form className="login-form-modern">
          <Form.Group className="login-form-group" controlId="formBasicEmail">
            <Form.Label className="login-label">Email address</Form.Label>
            <Form.Control 
              type='email' 
              placeholder="Enter email" 
              value={emaill} 
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            {emailError && (
              <Alert className='login-alert login-alert-danger login-alert-animation'>
                {emailError}
              </Alert>
            )}
          </Form.Group>

          <Form.Group className="login-form-group" controlId="formBasicPassword">
            <Form.Label className="login-label">Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={passwordd} 
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </Form.Group>
          
          {passwordError && (
            <Alert className='login-alert login-alert-danger login-alert-animation'>
              {passwordError}
            </Alert>
          )}
          
          {successMessage && (
            <Alert className='login-alert login-alert-success login-alert-animation'>
              {successMessage}
            </Alert>
          )}
          
          <Button 
            variant="primary" 
            type="submit" 
            onClick={Valider}
            className="login-btn-modern"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
export default StudentLogin;
