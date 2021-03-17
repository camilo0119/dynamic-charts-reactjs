import StatisticsByCriteria from "./views/StatisticsByCriteria";
import {UserProvider}  from './context/ususario-context';
import React from 'react';

function App() {

  return (
    <div>
      <UserProvider>
        <StatisticsByCriteria/>
      </UserProvider>
    </div>
  );
}

export default App;
