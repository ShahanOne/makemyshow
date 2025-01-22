'use client';
import Navbar from '../../components/Navbar';
import RegisterForm from '../../components/RegisterForm';
import { useState } from 'react';
const Register = () => {
  const [theme, setTheme] = useState<string>('light');
  const changeTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  return (
    <div>
      <Navbar theme={theme} changeTheme={changeTheme} isSignedIn={false} />
      <RegisterForm theme={theme} />
    </div>
  );
};

export default Register;
