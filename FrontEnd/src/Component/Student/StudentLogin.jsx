import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import React , {useState} from 'react';

const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const valider = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
       if(email=== "")
        { 
      setEmailError('Email is required');
        }

        if(password === ""){
            setPasswordError('Password is required');
        }
        else if(password.length < 8){
            setPasswordError('Password must be at least 8 characters long');
        }

    }

    
    return (
        <>
        <Form className="w-75 mmt-5">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={setEmail} />
        <Alert className='mt-2'  variant="danger">        </Alert>


        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={password} />
      </Form.Group>
        <Alert className='mt-2'  variant="danger">        </Alert>

      <Button variant="primary" type="submit" onClick={Valider}>
        Submit
      </Button>
    </Form>
        </>
    );
}
export default StudentLogin;
