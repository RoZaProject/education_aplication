import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "./authorisationForm.module.css";

const AuthorisationPage = () => {
  const [formData, setFormData] = useState({
    nick: "",
    name: "",
    surname: "",
    password: "",
    acceptPassword: "",
    birthday: "",
  });

  const handleChangeFormInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container
      className={`d-flex justify-content-center mt-5 `}
    >
      <Card className={`${Styles.containerForm}`}>
        <h2 className="text-center mb-4">Регистрация</h2>
          <Form.Group className="mb-3">
          <Form.Label>Ник</Form.Label>
          <Form.Control
            type="text"
            name="nick"
            onChange={handleChangeFormInput}
          />
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>

        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChangeFormInput}
          />
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChangeFormInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChangeFormInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Подтверждение пароля</Form.Label>
          <Form.Control
            type="password"
            name="acceptPassword"
            value={formData.acceptPassword}
            onChange={handleChangeFormInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Дата рождения</Form.Label>
          <Form.Control
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChangeFormInput}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className={`w-100 ${Styles.formBtn} 	bg-success` }
        >
          <a href="/"> Зарегистрироваться</a>
        </Button>
        <Button
          variant="primary"
          type="submit"
          className={`w-100 ${Styles.formBtn} bg-primary`}
        >
          Авторизоваться
        </Button>
      </Card>
    </Container>
  );
};

export default AuthorisationPage;
