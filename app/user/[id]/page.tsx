'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import TicketCard from '../../../components/TicketCard';

const User = () => {
  const [userData, setuserData] = useState({
    name: '',
    boughtTickets: [],
  });
  const router = useRouter();
  const pathname = usePathname();
  const userId = pathname.split('/').pop();
  const userType =
    typeof window !== 'undefined' && localStorage.getItem('__ut');
  //   const userId = typeof window !== 'undefined' && localStorage.getItem('__uid');
  let signInStatus;
  if (userType && userId) {
    signInStatus = 'Out';
  } else {
    signInStatus = 'In';
  }

  const handleSignOrOut = () => {
    if (userType && userId) {
      // router.push(`${userType}/${userId}`);
      typeof window !== 'undefined' && localStorage.removeItem('__uid');
      typeof window !== 'undefined' && localStorage.removeItem('__ut');
      router.push('/');
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    const getuserData = async () => {
      try {
        const res = await fetch('/api/user/get-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([
            {
              userId: userId,
            },
          ]),
        })
          .then((response) => response.json())
          .then((data) => {
            setuserData(data?.user);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getuserData();
  }, []);

  return (
    <>
      <Navbar
        userId={userId}
        userType={userType}
        signStatus={signInStatus}
        signInOrOut={handleSignOrOut}
      />
      <div>
        <div className="profile_div"></div>
        <div className="bookings_div">
          <p>My Bookings</p>
          <div className="grid grid-cols-4 gap-4">
            {userData?.boughtTickets?.map((ticket, index) => (
              <TicketCard key={index} movie={ticket.movie} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
