'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface NavbarProps {
  mode?: string;
  // changeTheme?: () => void;
  // theme?: string;
  userType?: string;
  userId?: string;
  signStatus?: string;
  signInOrOut?: () => void;
}

const Navbar = ({
  mode,
  // changeTheme,
  // theme,
  userType,
  userId,
  signStatus,
  signInOrOut,
}: NavbarProps) => {
  const [themeLight, setThemeLight] = useState<boolean>(true);
  const router = useRouter();

  const changeTheme = () => {
    setThemeLight((prev) => !prev);
  };
  return (
    <div className="flex flex-col md:flex-row justify-between bg-red-500 text-white px-6 py-8 ">
      <p className="text-lg md:text-xl font-bold">Make~my~Show</p>
      <div className="flex justify-between pt-2 md:pt-0 md:justify-center gap-4 md:gap-12">
        <button
          className={`shadow-lg rounded-2xl px-2 cursor-pointer text-red-500 ${
            themeLight ? 'bg-slate-300 ' : 'bg-zinc-800'
          }`}
          onClick={changeTheme}
        >
          {mode} Mode
        </button>{' '}
        <p className=" cursor-pointer" onClick={() => router.push('/')}>
          Home
        </p>
        <p
          className=" cursor-pointer"
          onClick={() => router.push(`/${userType}/${userId}`)}
        >
          My Account
        </p>
        <p className=" cursor-pointer" onClick={() => signInOrOut()}>
          Sign {'signStatus'}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
