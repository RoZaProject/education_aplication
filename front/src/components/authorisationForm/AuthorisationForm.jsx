import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "./authorisationForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthorisationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    password: "",
    acceptPassword: "",
    birthday: "",
  });
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChangeFormInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    // Очищаем ошибку при изменении поля
    if (errors[e.target.name]) {
      setErrors({...errors, [e.target.name]: ""});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Имя обязательно";
    if (!formData.surname.trim()) newErrors.surname = "Фамилия обязательна";
    if (formData.password.length < 6) newErrors.password = "Пароль должен быть не менее 6 символов";
    if (formData.password !== formData.acceptPassword) newErrors.acceptPassword = "Пароли не совпадают";
    if (!formData.birthday) newErrors.birthday = "Укажите дату рождения";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post("http://localhost:8000/register", {
        firstName: formData.firstName,
        lastName: formData.lastNamename,
        password: formData.password,
        birthday: formData.birthday,
      });
      
      // Если регистрация успешна, сохраняем токен и перенаправляем
      localStorage.setItem("token", response.data.token);
      navigate("/profile"); // Перенаправляем на страницу профиля
      
    } catch (error) {
      console.error("Registration error:", error);
      setApiError(
        error.response?.data?.message || 
        "Произошла ошибка при регистрации. Попробуйте позже."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className={`d-flex justify-content-center mt-5`}>
      <Card className={`${Styles.containerForm}`}>
        <h2 className="text-center mb-4">Регистрация</h2>
        
        {apiError && <Alert variant="danger">{apiError}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Имя</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChangeFormInput}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChangeFormInput}
              isInvalid={!!errors.surname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.surname}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChangeFormInput}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Подтверждение пароля</Form.Label>
            <Form.Control
              type="password"
              name="acceptPassword"
              value={formData.acceptPassword}
              onChange={handleChangeFormInput}
              isInvalid={!!errors.acceptPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.acceptPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChangeFormInput}
              isInvalid={!!errors.birthday}
            />
            <Form.Control.Feedback type="invalid">
              {errors.birthday}
            </Form.Control.Feedback>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className={`w-100 ${Styles.formBtn}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AuthorisationForm;