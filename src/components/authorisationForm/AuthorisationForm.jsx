import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthorisationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    password: "",
    acceptPassword: "",
    birthday: "",
  })

  const handleChangeFormInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  console.log(formData)

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card>
        <h2 className="text-center mb-4">Регистрация</h2>
        <Form.Group className="mb-3">
          <Form.Label>Имя</Form.Label>
          <Form.Control type="text" name="name"  onChange={handleChangeFormInput} />
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Form.Group>
      </Card>
    </Container>
  );
};

export default AuthorisationForm