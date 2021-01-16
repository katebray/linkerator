import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import NewLink from './NewLink';
import Search from './Search';

const App = () => {
  const [createdLink, setCreatedLink] = useState({});

  return (
    <div className='App'>
      <NewLink setCreatedLink={setCreatedLink} />
      <Search createdLink={createdLink} />
    </div>
  );
};

export default App;
