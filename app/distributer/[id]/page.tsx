import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const DistributorPage = () => {
  const router = useRouter();

  const userType =
    typeof window !== 'undefined' && localStorage.getItem('__ut');
  const userId = typeof window !== 'undefined' && localStorage.getItem('__uid');

  let distributerId;
  if (userType === 'distributer') {
    distributerId =
      typeof window !== 'undefined' && localStorage.getItem('__uid');
  }

  let signInStatus: boolean;
  useEffect(() => {
    if (userType && userId) {
      signInStatus = true;
    } else {
      signInStatus = false;
      router.push('/');
    }
  }, [userType, userId]);
  return <div>DistributorPage</div>;
};

export default DistributorPage;
