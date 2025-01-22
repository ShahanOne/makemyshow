'use client';
import LoginForm from '../../components/LoginForm';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
const Login = () => {
  const [theme, setTheme] = useState<string>('light');
  const changeTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  return (
    <div>
      <Navbar theme={theme} changeTheme={changeTheme} isSignedIn={false} />
      <LoginForm theme={theme} />
    </div>
  );
};

export default Login;
