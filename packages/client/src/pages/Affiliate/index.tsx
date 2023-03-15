import React, { FC } from 'react';

import { NoLoggedUser } from '@betnomi/client/src/containers/affiliate/NoLoggedUser';
import { LoggedUser } from '@betnomi/client/src/containers/affiliate/LoggedUser';
import { useUser } from '../../hooks/useUser';

const Affiliate: FC = () => {
  const {
    isAuthorized,
  } = useUser();

  return (
    isAuthorized ? <LoggedUser /> : <NoLoggedUser />
  );
};

export default Affiliate;
