import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<string | undefined>();

  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  const register = async () => {
    if (password !== confirmPassword || !isValidEmail) {
      return;
    }
    try {
      const res = await fetch(`/api/${userType}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            username: username,
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
            toast.error('Error trying to Register, Please try again');
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 to-orange-300 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Register
        </h2>
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setUserType('distributer')}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
              userType === 'distributer'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Distributer
          </button>
          <button
            onClick={() => setUserType('user')}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
              userType === 'user'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            User
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-2"
          >
            Username
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="Your username"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Create Password
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Confirm Password
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={() => register()}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition-colors"
        >
          Register
        </button>
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-indigo-500 hover:underline transition duration-200 ease-in-out font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
