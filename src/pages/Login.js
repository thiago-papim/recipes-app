import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo3 from '../images/logo3.png';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const validationEmail = /\S+@\S+\.\S+/;

  const validation = () => {
    const minLength = 6;
    if (validationEmail.test(email) === true && passWord.length >= minLength) {
      setBtnDisabled(false);
    } else { setBtnDisabled(true); }
  };

  const inputEmailChange = ({ target: { value } }) => {
    setEmail(
      value,
    );
    validation();
  };

  const inputPasswordChange = ({ target: { value } }) => {
    setPassWord(
      value,
    );
    validation();
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-secundary to-quinary flex text-center h-screen items-center bg-cover bg-[url('https://i.ibb.co/jTtzLyX/composicao-plana-leiga-de-macarrao-com-copyspace.jpg')]">
      <img
        className="w-64"
        src={ logo3 }
        alt="logo"
      />
      <form
        className="border-2 p-10 rounded-lg opacity-90 "
        onSubmit={ (e) => {
          e.preventDefault();
          history.push('/meals');
          localStorage.setItem('user', JSON.stringify({ email }));
        } }
      >
        <h2>
          Login
        </h2>
        <div className=" flex flex-col mx-auto justify-center space-y-4">
          <input
            type="email"
            data-testid="email-input"
            placeholder="Digite seu email..."
            onChange={ inputEmailChange }
            className="
            bg-gray-100 border border-gray-200 rounded-md p-2 text-gray-800 w-64
            disabled:bg-slate-50
            disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            "
          />
          <input
            placeholder="Digite sua senha..."
            type="password"
            data-testid="password-input"
            minLength="6"
            onChange={ inputPasswordChange }
            className="bg-gray-100 border
            border-gray-200 rounded-md p-2 text-gray-800 w-64"
          />
          <button
            className="p-2 rounded-lg text-white enabled:bg-secundary mx-4 pb
            disabled:bg-primary"
            data-testid="login-submit-btn"
            type="submit"
            disabled={ btnDisabled }
          >
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
