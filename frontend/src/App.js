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

      <header className="App-footer-team">
      <h1>Team 4</h1>
      </header>


      <header className="App-footer">
        Sources:  
        <a href="https://data.baltimorecity.gov/datasets/baltimore::part-1-crime-data-/explore">Crime data source</a>
        |
        <a href="https://usafacts.org/visualizations/coronavirus-covid-19-spread-map/state/maryland/county/baltimore-county
">Covid data </a>
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

