import Image from 'next/image';
import React from 'react';

const NavBar = () => {
  return (
    <div className='flex bg-hsl(0, 0%, 100%) px-[16px] py-[12px]'>
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
      {/* <Directory />
      <SearchInput />
      <WriteInput /> */}
    </div>
  );
}

export default NavBar;