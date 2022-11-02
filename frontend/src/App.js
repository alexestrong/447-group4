import './App.css';
import MapComponent from './components/MapComponent';

function App() {
  return (
    <div className="App">

      <header className="App-header">
      Hello, Team 4
      </header>

      <div className="App-map">
      Map will go here
      <MapComponent />
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
