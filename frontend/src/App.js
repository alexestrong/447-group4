import './App.css';
import ChartTests from './components/ChartTest';
import Map from './components/Map';

function App() {

  return (
    <div className="App">

      <header className="App-header">
      Baltimore Crime and COVID tracker
      </header>

      <div className="float-container">

        <div className="float-child-map">
          <Map />
        </div>
        <div className="float-child-filters">
          FILTERS
        </div>

      </div>

      <div className="App-charts">
      </div>
      <ChartTests />

    </div>
  );
}

export default App;
