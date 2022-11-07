import './App.css';
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
        Charts will go here
      </div>


    </div>
  );
}

export default App;
