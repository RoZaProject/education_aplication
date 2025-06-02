<<<<<<< HEAD
import React, { useState } from 'react';
import { Container, Card, Form, Button, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './authorisationForm.module.css';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    emailOrNick: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    nick: '',
    name: '',
    surname: '',
    password: '',
    acceptPassword: '',
    birthday: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);
    // Логика авторизации
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', registerData);
    // Логика регистрации
  };

  return (
    <div className={styles['auth-container']}>
      <Container className={`d-flex justify-content-center align-items-center ${styles['container-override']}`}>
        <Card className={styles['auth-card']}>
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <h2 className={`mb-3 ${styles['auth-title']}`}>ROZA</h2>
              <p className={`text-muted ${styles['auth-subtitle']}`}>
                {activeTab === 'login' ? 'Вход в систему' : 'Регистрация'}
              </p>
            </div>

            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className={`mb-4 ${styles['auth-tabs']}`}
              variant="pills"
            >
              <Tab eventKey="login" title="Вход" className="border-0">
                <Form onSubmit={handleLoginSubmit} className={styles['auth-form']}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email или никнейм</Form.Label>
                    <Form.Control
                      type="text"
                      name="emailOrNick"
                      value={loginData.emailOrNick}
                      onChange={handleLoginChange}
                      required
                      className={styles['auth-input']}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      className={styles['auth-input']}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className={`w-100 ${styles['btn-custom']}`}
                  >
                    Войти
                  </Button>
                </Form>
              </Tab>

              <Tab eventKey="register" title="Регистрация" className="border-0">
                <Form onSubmit={handleRegisterSubmit} className={styles['auth-form']}>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={registerData.name}
                          onChange={handleRegisterChange}
                          required
                          className={styles['auth-input']}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                          type="text"
                          name="surname"
                          value={registerData.surname}
                          onChange={handleRegisterChange}
                          className={styles['auth-input']}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Никнейм</Form.Label>
                    <Form.Control
                      type="text"
                      name="nick"
                      value={registerData.nick}
                      onChange={handleRegisterChange}
                      required
                      className={styles['auth-input']}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Дата рождения</Form.Label>
                    <Form.Control
                      type="date"
                      name="birthday"
                      value={registerData.birthday}
                      onChange={handleRegisterChange}
                      className={styles['auth-input']}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                      className={styles['auth-input']}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Подтвердите пароль</Form.Label>
                    <Form.Control
                      type="password"
                      name="acceptPassword"
                      value={registerData.acceptPassword}
                      onChange={handleRegisterChange}
                      required
                      className={styles['auth-input']}
                    />
                  </Form.Group>

                 <Button
                  variant="primary"
                  type="submit"
                  className={`w-100 ${styles['btn-custom']}`} 
                >
                  Зарегистрироваться
                </Button>
                </Form>
              </Tab>
            </Tabs>

            <div className={`text-center mt-3 ${styles['auth-switch']}`}>
              {activeTab === 'login' ? (
                <p className="text-muted">
                  Нет аккаунта?{' '}
                  <Button
                    variant="link"
                    onClick={() => setActiveTab('register')}
                    className={styles['auth-switch-button']}
                  >
                    Создайте новый
                  </Button>
                </p>
              ) : (
                <p className="text-muted">
                  Уже есть аккаунт?{' '}
                  <Button
                    variant="link"
                    onClick={() => setActiveTab('login')}
                    className={styles['auth-switch-button']}
                  >
                    Войти
                  </Button>
                </p>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AuthPage;
=======
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

  const baseURL = "http://localhost:8000";

  const handleChangeFormInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nick.trim()) newErrors.nick = "Введите никнейм";
    if (!formData.password) newErrors.password = "Введите пароль";

    if (mode === "register") {
      if (!formData.name.trim()) newErrors.name = "Введите имя";
      if (!formData.surname.trim()) newErrors.surname = "Введите фамилию";
      if (!formData.birthday) newErrors.birthday = "Введите дату рождения";
      if (formData.password.length < 8) {
        newErrors.password = "Пароль должен быть не менее 8 символов";
      }
      if (formData.password !== formData.acceptPassword) {
        newErrors.acceptPassword = "Пароли не совпадают";
      }
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
      const url = mode === "register" ? `${baseURL}/register` : `${baseURL}/token`;
      const payload =
        mode === "register"
          ? {
              nickname: formData.nick,
              first_name: formData.name,
              last_name: formData.surname,
              password: formData.password,
              birthday: formData.birthday,
            }
          : new URLSearchParams({
              username: formData.nick,
              password: formData.password,
              grant_type: "password",
            });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type":
            mode === "register"
              ? "application/json"
              : "application/x-www-form-urlencoded",
        },
        body: mode === "register"
          ? JSON.stringify(payload)
          : payload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Ошибка сервера");
      }

      const token = mode === "login"
        ? data.access_token
        : (await (await fetch(`${baseURL}/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              username: formData.nick,
              password: formData.password,
              grant_type: "password",
            }),
          })).json()).access_token;

      localStorage.setItem("token", token);
      navigate("/");
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
>>>>>>> 0f2d6f7dd1b8d3d5ba4a20b807f764659aa7c5fe
