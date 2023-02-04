import React, { ReactElement } from 'react';

const GuestLayout = ({
  children
}: {
  children: ReactElement
}) => {
  return (
    <>
      {children}
    </>
  );
}

export default GuestLayout;