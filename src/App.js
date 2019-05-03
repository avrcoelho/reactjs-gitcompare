import React, { Fragment } from 'react';

import GlobalStyle from './styles/global';

import Main from './pages/Main/index';

// Fragment permite coloca tipo uma div invisivel
const App = () => (
  <Fragment>
    <GlobalStyle />
    <Main />
  </Fragment>
);

export default App;
