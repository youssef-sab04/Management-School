
import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import ParentApi from '../../service/api/student/ParentApi';

const ParentForm = (props) => {
  const [formData, setFormData] = useState({
    firstname: '', lastname: '', date_of_birth: '', gender: '',
    blood_type: '', address: '', phone: '', email: '', password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // FONCTION DE VALIDATION AJOUTÉE
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

    // Validation address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length > 255) {
      newErrors.address = 'Address must be less than 255 characters';
    }

    // Validation phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must contain exactly 10 digits';
    }

    // Validation email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Validation password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
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

  //setIsSubmitting(true);

  if(props.operation === "create"){
        setIsSubmitting(true)

  try {
    const response = await ParentApi.create(formData);
    console.log("Parent created successfully:", response.data);
    
    // Optionnel: Reset du formulaire après succès
    /*setFormData({
      firstname: '', lastname: '', date_of_birth: '', gender: '',
      blood_type: '', address: '', phone: '', email: '', password: ''
    }); */
/*
  setFormData({
    firstname: '', 
    lastname: '', 
    date_of_birth: '', 
    gender: '',
    blood_type: '', 
    address: '', 
    phone: '', 
    email: '', 
    password: ''
  });
  */
  setErrors({});
    // Optionnel: Message de succès
    alert('Parent créé avec succès!');
    console.log("Resonse", response);
    console.log("Data", response.data);

    
    
  } catch (error) {
    console.error("Error creating parent:", error);
        setIsSubmitting(false)

    
    // Gestion des erreurs du serveur
    if (error.response?.data?.errors) {
      setErrors(error.response.data.errors);
    } else {
      alert('Erreur lors de la création du parent');
    }
  } finally {
    setIsSubmitting(false);

  }

}  
else if (props.operation === "updateuser"){
          setIsSubmitting(true)

  console.log("Update operation not implemented yet");
  console.log("Mweee", formData);
  console.log("Parent ID:", props?.parentId);
  try {
    const response = await ParentApi.update(props?.parentId , formData);
    console.log("Parent updated successfully:", response.data);
    

    
    // Optionnel: Message de succès
    alert('Parent créé avec succès!');
    console.log("Resonse", response);
    console.log("Data", response.data);
     props.onSuccess();

    
    
  } catch (error) {
    console.error("Error creating parent:", error);
        setIsSubmitting(false)

    
    // Gestion des erreurs du serveur
    if (error.response?.data?.errors) {
      setErrors(error.response.data.errors);
    } else {
      alert('Erreur lors de l update du parent');
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
        <Form.Label>Address</Form.Label>
        <Form.Control
          as="textarea"
          name="address"
          value={formData.address}
          onChange={handleChange}
          isInvalid={!!errors.address} // AJOUTÉ
        />
        <Form.Control.Feedback type="invalid"> {/* AJOUTÉ */}
          {errors.address}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          isInvalid={!!errors.phone} // AJOUTÉ
        />
        <Form.Control.Feedback type="invalid"> {/* AJOUTÉ */}
          {errors.phone}
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

export default ParentForm;