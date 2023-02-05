import Image from 'next/image';
import React from 'react';
import SearchInput from './SearchInput';

const NavBar: React.FC = () => {
  return (
    <div className='flex bg-hsl(0, 0%, 100%) px-[16px] py-[8px] space-x-2'>
      <div className='flex'>
        <Image
          src={"/images/redditFace.svg"}
          alt='Reddit Face'
          height={38}
          width={38}
        />
        <Image
          src={"/images/redditText.svg"}
          alt='Reddit Text'
          height={38}
          width={56}
          className='hidden sm:block'
        />
      </div>
      {/* <Directory /> */}
      <SearchInput />
      {/* <WriteInput /> */}
    </div>
  );
}

export default NavBar;