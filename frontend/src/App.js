import FiltersComponent from './components/FiltersComponent';
import './App.css';
import Map from './components/Map';
import React from 'react';

function App(){
  return (
    <div className="App">

      <header className="App-header">
      Baltimore Crime and COVID tracker
      </header>

      <div className="float-container">

        <div className="map-container">
          <Map />
        </div>
        <div className="filters-container">
          <header className="filters-title">
           <h1>Filters</h1>
          </header>
          <header className="filters-body">
          <FiltersComponent />
          </header>
        </div>

      </div>

      <div className="charts-container">
        Charts will go here
      </div>


    </div>
  );
  }

  export default App;

