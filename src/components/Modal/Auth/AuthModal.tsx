import {
  authModalState
} from '@/atoms/authModalAtom';

import React, {
  useEffect
} from 'react';

import {
  BsXLg
} from 'react-icons/bs';

import {
  useRecoilState
} from 'recoil';

import {
  auth
} from "@/firebase/clientApp";

import {
  useAuthState
} from 'react-firebase-hooks/auth';

import AuthInputs from './AuthInputs';

import OAuthButtons from './OAuthButtons';

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalState);

  const [
    user,
    loading,
    error
  ] = useAuthState(auth);

  const handleClose = () => {
    setAuthModal((prev) => ({
      ...prev,
      open: false
    }));
  }

  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  return (
    <>
      {
        authModal.open ? (
          <section className='auth-modal-pop-up fixed h-screen w-screen max-h-screen max-w-screen bg-[#00000080] top-0 left-0 px-8 py-12 flex flex-col items-center'>
            <div className='absolute -z-10 h-full w-full top-0 left-0 bg-transparent' onClick={() => handleClose()}></div>
            <div className='relative z-10 flex flex-col gap-y-4 bg-white h-min max-h-[640px] max-w-[400px] rounded-[16px] w-full pb-12 pt-16 overflow-y-hidden items-center'>
              <button
                type='button'
                title='Close'
                className='absolute h-[16px] w-[16px] aspect-square top-4 right-4'
                onClick={() => handleClose()}
              >
                <BsXLg className='h-full w-full aspect-square' />
              </button>
              <div className='relative flex flex-1 flex-col overflow-y-hidden items-center'>
                <header className='h-max px-16'>
                  <h1 className='font-medium text-xl'>
                    { authModal.view === "login" && "Log In" }
                    { authModal.view === "signup" && "Sign Up" }
                    { authModal.view === "resetPassword" && "Reset Password" }
                  </h1>
                  <p className='text-xs mt-2'>
                    By continuing, you agree are setting up a Reddit account and agree to our <button type='button' title='User Agreement' className='auth-modal-link' tabIndex={0}>User Agreement</button> and <button type='button' title='Privacy Policy' className='auth-modal-link' tabIndex={0}>Privacy Policy</button>. 
                  </p>
                </header>
                <div className='relative flex flex-col flex-1 items-center px-16 w-full overflow-y-auto scroll-y-style'>
                  <OAuthButtons />
                  <div className='w-full flex flex-row items-center justify-center my-4 gap-x-4'>
                    <span className='flex-1 h-[1px] bg-gray-200'></span>
                    <p className='text-gray-500 font-bold text-[14px]'>OR</p>
                    <span className='flex-1 h-[1px] bg-gray-200'></span>
                  </div>
                  <AuthInputs />
                  {/* <ResetPassword /> */}
                </div>
              </div>
            </div>
          </section> 
        ) : (
            null
        )
      }
    </>
  );
}

export default AuthModal;