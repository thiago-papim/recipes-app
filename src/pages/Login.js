import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import AppContext from '../context/AppContext';

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
    <div>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          history.push('/meals');
          localStorage.setItem('user', JSON.stringify({ email }));
        } }
      >
        <input
          type="email"
          data-testid="email-input"
          onChange={ inputEmailChange }
        />
        <input
          type="password"
          data-testid="password-input"
          minLength="6"
          onChange={ inputPasswordChange }
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ btnDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
