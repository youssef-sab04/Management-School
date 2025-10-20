import React, { useState } from "react"
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap"
import { contact } from "./data";
import ContactApi from "../service/api/student/ContactApi";

export const Contact = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Object: '',
    Message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ContactApi.create(formData);
      setShowAlert(true);
      setError("");
      setFormData({ Name: '', Email: '', Object: '', Message: '' });
    } catch (error) {
      setError("Erreur lors de l'envoi du message");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className='contact'>
        <h2 className='Titt'>Contact</h2>
        <hr></hr>
        <Container>
          <h2 className="contacttitle text-center mb-5">Keep In Touch</h2>
          {showAlert && <Alert variant="success">Message envoyé avec succès!</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Row className="justify-content-between">
            <Col lg={7} className="mb-4">
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control 
                        type="text" 
                        name="Name"
                        placeholder="Name" 
                        value={formData.Name}
                        onChange={handleChange}
                        data-aos='flip-left'
                        className="mb-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control 
                        type="email" 
                        name="Email"
                        placeholder="Email" 
                        value={formData.Email}
                        onChange={handleChange}
                        data-aos='flip-right'
                        className="mb-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    name="Object"
                    placeholder="Subject" 
                    value={formData.Object}
                    onChange={handleChange}
                    data-aos='flip-up'
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    name="Message"
                    placeholder="Your message..."
                    value={formData.Message}
                    onChange={handleChange}
                    data-aos='flip-down'
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit"
                  data-aos='zoom-in-up'
                  className="w-100"
                >
                  Submit
                </Button>
              </Form>
            </Col>

            <Col lg={4}>
              <div className="left">
                {contact.map((item, index) => (
                  <Card 
                    key={index} 
                    className="mb-3 p-3"
                    data-aos='zoom-in'
                  >
                    <Card.Body className="text-center">
                      <div className="mb-2">
                        <i>{item.icon}</i>
                      </div>
                      <Card.Text className="mb-1">{item.text1}</Card.Text>
                      <Card.Text className="mb-0">{item.text2}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}