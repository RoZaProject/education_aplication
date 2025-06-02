import React from "react";
import { render, screen } from "@testing-library/react";
import AuthorisationPage from "./AuthorisationPage";

describe("AuthorisationPage", () => {
  test("отображается заголовок 'Регистрация'", () => {
    render(<AuthorisationPage />);
    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
  });

  test("кнопки 'Зарегистрироваться' и 'Авторизоваться' отображаются", () => {
    render(<AuthorisationPage />);
    expect(screen.getByText(/Зарегистрироваться/i)).toBeInTheDocument();
    expect(screen.getByText(/Авторизоваться/i)).toBeInTheDocument();
  });

  test("форма содержит хотя бы одно поле ввода текста", () => {
  render(<AuthorisationPage />);
  const textboxes = screen.getAllByRole("textbox");
  expect(textboxes.length).toBeGreaterThan(0);
});

});
