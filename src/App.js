import StatisticsByCriteria from "./views/StatisticsByCriteria";
import {UserProvider}  from './context/ususario-context';
import React, {useEffect} from 'react';

var style = null

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
