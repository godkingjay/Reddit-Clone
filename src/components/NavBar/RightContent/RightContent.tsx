import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '@/components/Modal/Auth/AuthModal';

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <AuthModal />
      <div className='flex flex-row items-center space-x-2'>
        <AuthButtons />
      </div>
    </>
  );
}

export default RightContent;