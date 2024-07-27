import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState();
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  const login = async () => {
    if (!isValidEmail) {
      return;
    }
    try {
      const res = await fetch(`/api/${userType}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            email: email,
            password: password,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data[userType]) {
            typeof window !== 'undefined' &&
              localStorage.setItem('__ut', userType);
            // typeof window !== 'undefined' && localStorage.setItem('__uid',token from response)
            typeof window !== 'undefined' &&
              localStorage.setItem('__uid', data[userType]._id);
            router.push(`/${userType}/dashboard`);
          } else {
            toast.error('User not found, please Register or try again');
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-4 flex flex-col">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setUserType('distributer')}
          className={` px-4 py-2 rounded ${
            userType === 'distributer' ? 'bg-red-400' : 'bg-purple-500'
          }`}
        >
          Distributer
        </button>
        <button
          onClick={() => setUserType('user')}
          className={`bg-purple-500 px-4 py-2 rounded ${
            userType === 'user' ? 'bg-red-400' : 'bg-purple-500'
          }`}
        >
          User
        </button>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="rounded p-2 text-amber-700 outline-none m-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
      </div>
      <div>
        {' '}
        <label htmlFor="password">Password</label>
        <input
          className="rounded p-2 text-amber-700 outline-none m-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </div>

      <button
        onClick={() => login()}
        className="bg-orange-400 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
