import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LoginForm = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<string | undefined>();

  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  const login = async () => {
    if (!isValidEmail) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!userType) {
      toast.error('Please select the user type');
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
            typeof window !== 'undefined' &&
              localStorage.setItem('__uid', data[userType]._id);
            router.push('/');
            // router.push(`/${userType}/dashboard`);
          } else {
            toast.error('User not found, please Register or try again');
          }
        });
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong, please try again later');
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        theme === 'light'
          ? 'from-indigo-300 to-orange-300'
          : 'from-rose-950 to-gray-900'
      } flex items-center justify-center`}
    >
      <div
        className={` ${
          theme === 'light' ? 'bg-white' : 'bg-zinc-900'
        } shadow-lg rounded-lg p-8 w-full max-w-md`}
      >
        <h2
          className={`text-2xl font-bold ${
            theme === 'light' ? 'text-gray-800' : 'text-gray-300'
          } text-center mb-6`}
        >
          Login
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
            htmlFor="email"
            className={`block ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-300'
            } font-medium mb-2`}
          >
            Email
          </label>
          <input
            className={`w-full p-3 border rounded-lg outline-none focus:ring-2 ${
              theme === 'light'
                ? 'border-gray-300 focus:ring-indigo-500'
                : 'bg-zinc-800 text-gray-300 border-zinc-500 focus:ring-rose-600'
            }`}
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
            className={`block ${
              theme === 'light' ? 'text-gray-800' : 'text-gray-300'
            } font-medium mb-2`}
          >
            Password
          </label>
          <input
            className={`w-full p-3 border rounded-lg outline-none focus:ring-2 ${
              theme === 'light'
                ? 'border-gray-300 focus:ring-indigo-500'
                : 'bg-zinc-800 text-gray-300 border-zinc-500 focus:ring-rose-600'
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={() => login()}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-lg transition-colors"
        >
          Login
        </button>
        <p
          className={`text-center ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-200'
          } mt-4`}
        >
          Don&apos;t have an account?{' '}
          <a
            href="/register"
            className="text-sky-500 hover:underline font-medium transition duration-200 ease-in-out"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
