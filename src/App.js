import StatisticsByCriteria from "./views/StatisticsByCriteria";
import {UserProvider, useUsuario}  from './context/ususario-context';

function App() {

  return (
    <div className="container">
      <UserProvider>
        <StatisticsByCriteria/>
      </UserProvider>
    </div>
  );
}

export default App;
