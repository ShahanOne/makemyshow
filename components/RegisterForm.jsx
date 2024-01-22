import axios from 'axios';
import React, { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
    const [userType,setUserType] = useState()


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  const register = async () => {
    if (password !== confirmPassword || !isValidEmail) {
      return;
    }
    try {
      const res = await axios.post(`/api/${userType}/register`, {
        username: username,
        email: email,
        password: password,
      });
      if (res.data.username) {
        localStorage.setItem('__ut', userType);
        // localStorage.setItem('__uid',token from response)
        // router.push('/user/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-4 flex flex-col">
         <div className='flex justify-center gap-4'>
        <button onClick={()=>setUserType('distributer')} className={` px-4 py-2 rounded ${userType === 'distributer' ? 'bg-red-400' :'bg-purple-500'}`}>Distributer</button>
        <button onClick={()=>setUserType('user')} className={`bg-purple-500 px-4 py-2 rounded ${userType === 'user' ? 'bg-red-400' :'bg-purple-500'}`}>User</button>

      </div>
      <div>
        {' '}
        <label htmlFor="username">Create Username</label>
        <input
        className='rounded p-2 text-amber-700 outline-none m-2'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
        className='rounded p-2 text-amber-700 outline-none m-2'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
      </div>
      <div>
        {' '}
        <label htmlFor="password">Create Password</label>
        <input
        className='rounded p-2 text-amber-700 outline-none m-2'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </div>

      <div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
        className='rounded p-2 text-amber-700 outline-none m-2'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          id="confirm-password"
        />
      </div>

      <button
        onClick={() => register()}
        className="bg-orange-400 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
