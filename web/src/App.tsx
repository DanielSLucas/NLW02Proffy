import React from 'react';

import Routes from './routes/routes';

import AppProvider from './hooks';

import './assets/styles/global.css';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
