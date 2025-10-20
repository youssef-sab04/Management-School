import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import StudentApi from '../../service/api/student/StudentApi';
import ParentApi from '../../service/api/student/ParentApi';
import ClassApi from '../../service/api/student/ClassApi';






const StudentForm = (props) => {

  const [formData, setFormData] = useState({
    firstname: '', lastname: '', date_of_birth: '', gender: '',
    blood_type: '', email: '', password: '' , parents_id: '' , classe_id:'', 

  });

  const [parents, setParents] = useState([]);
  const [classes, setClasse] = useState([]);


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };


  useEffect(() => {

      ParentApi.all().then((response) => {
        setParents(response.data.data);
        
        });

        ClassApi.all().then((response) => {
        setClasse(response.data.data);
        
        });

},  []);
console.log("Parents", parents);
console.log("classes" , classes)

let Parent_info = parents.map(item => ({
    id: item.id,
    p: item.lastname,
    n: item.firstname
}));

let Class_info = classes.map(item => ({
    id: item.id,
    n: item.name,
    c: item.code
}));
  const validateForm = () => {
    const newErrors = {};

    // Validation firstname
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'Firstname is required';
    } else if (formData.firstname.length > 50) {
      newErrors.firstname = 'Firstname must be less than 50 characters';
    }

    // Validation lastname
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Lastname is required';
    } else if (formData.lastname.length > 50) {
      newErrors.lastname = 'Lastname must be less than 50 characters';
    }

    // Validation date_of_birth
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of birth is required';
    }

    // Validation gender
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Validation blood_type
    if (!formData.blood_type) {
      newErrors.blood_type = 'Blood type is required';
    }



    // Validation email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

      if (!formData.parents_id) {
      newErrors.parents_id = 'Parent is required';
      }

    // Validation password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si pas d'erreurs
  };
 
  console.log("Props Operation:", props.operation);  
  useEffect(() => {
    if (props.operation === 'updateuser' ) {
      console.log("Props Parent Data:", props?.Pvalues);
      setFormData(props?.Pvalues)
    }
  }, [props.operation, props?.Pvalues]);

const handleSubmit = async (e  ) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }


  if(props.operation === "create"){
    setIsSubmitting(true)

   console.log("Data" , formData) 
   

  try {
    const response = await StudentApi.create(formData);
    console.log("User created successfully:", response.data);
    

    
    // Optionnel: Message de succès
    alert('Student créé avec succès!');
    console.log("Resonse", response);
    console.log("Data", response.data);
    
    setFormData({
    firstname: '', 
    lastname: '', 
    date_of_birth: '', 
    gender: '',
    blood_type: '', 
    parents_id: '',
    classe_id:'', 
    email: '', 
    password: ''
  });
  
  setErrors({});

    
    
  } catch (error) {
    console.error("Error creating parent:", error);
        setIsSubmitting(false)

    
    // Gestion des erreurs du serveur
    if (error.response?.data?.errors) {
      setErrors(error.response.data.errors);
    } else {
      alert('Erreur lors de la création du student');
    }
  } finally {
    setIsSubmitting(false);

  }

}  
else if (props.operation === "updateuser"){
setIsSubmitting(true)

  console.log("Update operation not implemented yet");
  console.log("Form Data to update:", formData);
  console.log(props?.studentId  );

  
  try {
    const response = await  StudentApi.update(props?.studentId , formData);
    console.log("Parent created successfully:", response.data);
    

    
    // Optionnel: Message de succès
    alert('Student  updated avec succès!');
    console.log("Resonse", response);
    console.log("Data", response.data);
     props.onSuccess();

    
    
  } catch (error) {
    console.error("Error creating user:", error);
        setIsSubmitting(false)

    
    // Gestion des erreurs du serveur
    if (error.response?.data?.errors) {
      setErrors(error.response.data.errors);
    } else {
      alert('Erreur lors de l update du student');
    }
  } finally {
    setIsSubmitting(false);

  }
    

}
  
};




  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Firstname</Form.Label>
        <Form.Control
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          isInvalid={!!errors.firstname} // AJOUTÉ
        />
        <Form.Control.Feedback type="invalid"> {/* AJOUTÉ */}
          {errors.firstname}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Lastname</Form.Label>
        <Form.Control
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          isInvalid={!!errors.lastname} // AJOUTÉ
        />
        <Form.Control.Feedback type="invalid"> {/* AJOUTÉ */}
          {errors.lastname}
        </Form.Control.Feedback>
      </Form.Group>

      

      <Form.Group className="mb-3">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          isInvalid={!!errors.date_of_birth} // AJOUTÉ
        />
        <Form.Control.Feedback type="invalid"> {/* AJOUTÉ */}
          {errors.date_of_birth}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          isInvalid={!!errors.gender} // AJOUTÉ
        >
          <option value="">Select</option>
          <option value="m">Male</option>
          <option value="f">Female</option>

        </Form.Select>
        <Form.Control.Feedback type="invalid"> {/* AJOUTÉ */}
          {errors.gender}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Blood Type</Form.Label>
        <Form.Select
          name="blood_type"
          value={formData.blood_type}
          onChange={handleChange}
          isInvalid={!!errors.blood_type} // AJOUTÉ
        >
          <option value="">Select</option>
          {['O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid"> {/* AJOUTÉ */}
          {errors.blood_type}
        </Form.Control.Feedback>
      </Form.Group>
  


  
      <Form.Group className="mb-3">
        <Form.Label>Parent</Form.Label>
        <Form.Select
          name="parents_id"
          value={formData.parents_id}
          onChange={handleChange}
          isInvalid={!!errors.parents_id} // AJOUTÉ
        >
          <option value="">Select</option>
          {Parent_info.map(p => (
            <option key={p.id} value={p.id}>{p.n + " " + p.p}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid"> {/* AJOUTÉ */}
          {errors.parents_id}
        </Form.Control.Feedback>
      </Form.Group>

        
      <Form.Group className="mb-3">
        <Form.Label>Classe</Form.Label>
        <Form.Select
          name="classe_id"
          value={formData.classe_id}
          onChange={handleChange}
          isInvalid={!!errors.classe_id} // AJOUTÉ
        >
          <option value="">Select</option>
          {Class_info.map(p => (
            <option key={p.id} value={p.id}>{p.n + " " + (p.c)}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid"> {/* AJOUTÉ */}
          {errors.classe_id}
        </Form.Control.Feedback>
      </Form.Group>



      





      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email} // AJOUTÉ
        />
        <Form.Control.Feedback type="invalid"> {/* AJOUTÉ */}
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password} // AJOUTÉ
        />
        <Form.Control.Feedback type="invalid"> {/* AJOUTÉ */}
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      {/* CORRECTION : enlever onClick du Button */}
      <Button type="submit" disabled={isSubmitting}>
         {isSubmitting 
        ? (props.operation === 'updateuser' ? 'Updating...' : 'Creating...')
        : (props.operation === 'updateuser' ? 'Update' : 'Create')
    }

      </Button>


      {/* AFFICHAGE GÉNÉRAL DES ERREURS SI BESOIN */}
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mt-3">
          Please fix the errors above before submitting.
        </Alert>
      )}
    </Form>
  );
};


export default StudentForm;