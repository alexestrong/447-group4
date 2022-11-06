import './App.css';
import CrimeComponent from './components/CrimeComponent';

function App() {
  return (
    <div className="App">

      <header className="App-header">
      Baltimore Crime and COVID tracker
      </header>

      <div className="App-map">
      Map will go here
      <CrimeComponent />
      </div>

      <div className="App-filters">
      Filters will go here
      </div>

      <div className="App-charts">
      Charts will go here
      </div>

    </div>
  );
}

export default App;
