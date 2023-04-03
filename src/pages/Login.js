import React from 'react';

function Login() {
  <div>
    <form>
      <input
        type="email"
        data-testid="email-input"
      />
      <input
        type="password"
        data-testid="password-input"
      />
      <button
        data-testid="login-submit-btn"
        type="submit"
        /*         onClick={}
        disabled={ disabled } */
      >
        Enter
      </button>
    </form>
  </div>;
}

export default Login;
