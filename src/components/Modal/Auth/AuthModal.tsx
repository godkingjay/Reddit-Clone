import { authModalState } from '@/atoms/authModalAtom';
import React from 'react';
import { BsXLg } from 'react-icons/bs';
import { useRecoilState } from 'recoil';

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [authModalOpen, setAuthModalOpen] = useRecoilState(authModalState);
  
  console.log({
    authModalOpen
  });

  const handleClose = () => {
    setAuthModalOpen((prev) => ({
      ...prev,
      open: false
    }));
  }

  return (
    <>
      {
        authModalOpen.open ? (
          <section
            className='fixed h-screen w-screen max-h-screen max-w-screen bg-[#00000080] top-0 left-0 px-8 py-12 flex justify-center'
          >
            <div className='relative bg-white max-h-[640px] max-w-[400px] rounded-[16px] w-full pb-12 pt-16'>
              <button
                type='button'
                title='Close'
                className='absolute h-[16px] w-[16px] aspect-square top-4 right-4'
                onClick={() => handleClose()}
              >
                <BsXLg className='h-full w-full aspect-square' />
              </button>
              <div className='h-full overflow-y-auto px-16'>
                <h1>Hello</h1>
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