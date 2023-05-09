import Loader from 'Elements/Loader';
import React, { Suspense } from 'react';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
