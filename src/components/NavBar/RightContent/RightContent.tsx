import React from 'react';

import AuthButtons from './AuthButtons';

import AuthModal from '@/components/Modal/Auth/AuthModal';

import {
  auth
} from "@/firebase/clientApp";

import {
  useAuthState
} from 'react-firebase-hooks/auth';

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  const [
    user,
    loading,
    error
  ] = useAuthState(auth);

  return (
    <>
      <AuthModal />
      <div className='flex flex-row items-center space-x-2'>
        {
          user
          ? (
            <p>Logged In</p>
          )
          : (
            <AuthButtons />
          )
        }
      </div>
    </>
  );
}

export default RightContent;