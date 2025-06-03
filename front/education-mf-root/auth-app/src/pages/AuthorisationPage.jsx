import React, { useState } from 'react';
import { Container, Card, Form, Button, Tab, Tabs, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './authorisationForm.module.css';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ emailOrNick: '', password: '' });
  const [registerData, setRegisterData] = useState({
    nick: '',
    name: '',
    surname: '',
    password: '',
    acceptPassword: '',
    birthday: '',
  });
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const baseURL = 'http://localhost:8000';

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    try {
      const response = await fetch(`${baseURL}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: loginData.emailOrNick,
          password: loginData.password,
          grant_type: 'password',
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Ошибка авторизации');

      localStorage.setItem('token', data.access_token);
      console.log('Авторизация успешна, токен сохранён');
      navigate('/home');
    } catch (err) {
      setApiError(err.message || 'Ошибка подключения');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (registerData.password !== registerData.acceptPassword) {
      setApiError('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: registerData.nick,
          first_name: registerData.name,
          last_name: registerData.surname,
          password: registerData.password,
          birthday: registerData.birthday,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Ошибка регистрации');

      const loginResponse = await fetch(`${baseURL}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: registerData.nick,
          password: registerData.password,
          grant_type: 'password',
        }),
      });

      const loginData = await loginResponse.json();
      if (!loginResponse.ok) throw new Error(loginData.detail || 'Ошибка входа после регистрации');

      localStorage.setItem('token', loginData.access_token);
      console.log('Регистрация и вход успешны');
      navigate('/home');
    } catch (err) {
      setApiError(err.message || 'Ошибка подключения');
    }
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

            {apiError && <Alert variant="danger">{apiError}</Alert>}

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

                  <Button variant="primary" type="submit" className={`w-100 ${styles['btn-custom']}`}>
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

                  <Button variant="primary" type="submit" className={`w-100 ${styles['btn-custom']}`}>
                    Зарегистрироваться
                  </Button>
                </Form>
              </Tab>
            </Tabs>

            <div className={`text-center mt-3 ${styles['auth-switch']}`}>
              {activeTab === 'login' ? (
                <p className="text-muted">
                  Нет аккаунта?{' '}
                  <Button variant="link" onClick={() => setActiveTab('register')} className={styles['auth-switch-button']}>
                    Создайте новый
                  </Button>
                </p>
              ) : (
                <p className="text-muted">
                  Уже есть аккаунт?{' '}
                  <Button variant="link" onClick={() => setActiveTab('login')} className={styles['auth-switch-button']}>
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
