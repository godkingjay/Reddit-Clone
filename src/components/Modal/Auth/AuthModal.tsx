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
import AuthInputs from './AuthInputs';

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalState);

  const handleClose = () => {
    setAuthModal((prev) => ({
      ...prev,
      open: false
    }));
  }

  return (
    <>
      {
        authModal.open ? (
          <section className='auth-modal-pop-up fixed h-screen w-screen max-h-screen max-w-screen bg-[#00000080] top-0 left-0 px-8 py-12 flex justify-center'>
            <div className='absolute -z-10 h-full w-full top-0 left-0 bg-transparent' onClick={() => handleClose()}></div>
            <div className='relative z-10 flex flex-col gap-y-4 bg-white h-min max-h-[640px] max-w-[400px] rounded-[16px] w-full pb-12 pt-16 overflow-y-clip'>
              <button
                type='button'
                title='Close'
                className='absolute h-[16px] w-[16px] aspect-square top-4 right-4'
                onClick={() => handleClose()}
              >
                <BsXLg className='h-full w-full aspect-square' />
              </button>
              <header className='px-16'>
                <h1 className='font-medium text-xl'>
                  { authModal.view === "login" && "Log In" }
                  { authModal.view === "signup" && "Sign Up" }
                  { authModal.view === "resetPassword" && "Reset Password" }
                </h1>
                <p className='text-xs mt-2'>
                  By continuing, you agree are setting up a Reddit account and agree to our <a className='auth-modal-link' tabIndex={0}>User Agreement</a> and <a className='auth-modal-link' tabIndex={0}>Privacy Policy</a>. 
                </p>
              </header>
              <div className='flex flex-col items-center justify-center flex-1 overflow-y-auto px-16'>
                {/* <OAuthButtons /> */}
                <AuthInputs />
                {/* <ResetPassword /> */}
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