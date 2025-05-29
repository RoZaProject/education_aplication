import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "./authorisationForm.module.css";

const AuthorisationPage = ({ mode = "register" }) => {
  const [formData, setFormData] = useState({
    nick: "",
    name: "",
    surname: "",
    password: "",
    acceptPassword: "",
    birthday: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeFormInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Очищаем ошибку при изменении поля
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (mode === "register") {
      if (!formData.nick.trim()) newErrors.nick = "Введите никнейм";
      if (!formData.name.trim()) newErrors.name = "Введите имя";
      if (!formData.surname.trim()) newErrors.surname = "Введите фамилию";
      if (!formData.birthday) newErrors.birthday = "Введите дату рождения";
      if (formData.password.length < 8) {
        newErrors.password = "Пароль должен быть не менее 8 символов";
      }
      if (formData.password !== formData.acceptPassword) {
        newErrors.acceptPassword = "Пароли не совпадают";
      }
    } else {
      if (!formData.nick.trim()) newErrors.nick = "Введите никнейм";
      if (!formData.password) newErrors.password = "Введите пароль";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      const url = mode === "register" ? "/register" : "/token";
      const payload = mode === "register" 
        ? {
            nickname: formData.nick,
            first_name: formData.name,
            last_name: formData.surname,
            password: formData.password,
            birthday: formData.birthday
          }
        : new URLSearchParams({
            username: formData.nick,
            password: formData.password,
            grant_type: "password"
          });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": mode === "register" 
            ? "application/json" 
            : "application/x-www-form-urlencoded"
        },
        body: mode === "register" 
          ? JSON.stringify(payload) 
          : payload
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Ошибка сервера");
      }

      // Сохраняем токен при успешной авторизации
      if (mode === "login") {
        localStorage.setItem("token", data.access_token);
        navigate("/"); // Перенаправляем на главную
      } else {
        // После регистрации автоматически авторизуем
        const loginResponse = await fetch("/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            username: formData.nick,
            password: formData.password,
            grant_type: "password"
          })
        });
        const loginData = await loginResponse.json();
        localStorage.setItem("token", loginData.access_token);
        navigate("/");
      }
    } catch (error) {
      setApiError(error.message || "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className={`${Styles.containerForm}`}>
        <h2 className="text-center mb-4">
          {mode === "register" ? "Регистрация" : "Авторизация"}
        </h2>

        {apiError && <Alert variant="danger">{apiError}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Никнейм</Form.Label>
            <Form.Control
              type="text"
              name="nick"
              value={formData.nick}
              onChange={handleChangeFormInput}
              isInvalid={!!errors.nick}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nick}
            </Form.Control.Feedback>
          </Form.Group>

          {mode === "register" && (
            <>
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
            </>
          )}

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

          {mode === "register" && (
            <>
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
            </>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className={`w-100 ${Styles.formBtn} ${mode === "register" ? "bg-success" : "bg-primary"}`}
          >
            {isLoading ? "Загрузка..." : 
              mode === "register" ? "Зарегистрироваться" : "Авторизоваться"}
          </Button>

          <div className="mt-3 text-center">
            {mode === "register" ? (
              <span>
                Уже есть аккаунт?{" "}
                <Button variant="link" onClick={() => navigate("/login")}>
                  Войти
                </Button>
              </span>
            ) : (
              <span>
                Нет аккаунта?{" "}
                <Button variant="link" onClick={() => navigate("/register")}>
                  Зарегистрироваться
                </Button>
              </span>
            )}
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AuthorisationPage;