import FiltersComponent from './components/FiltersComponent';
import './App.css';
import Map from './components/Map';
import React from 'react';
import GenderChart from './components/GenderCharts';
import CrimeChart from './components/CrimeTypeCharts';
import DistrictChart from './components/DistrictCharts';
import CovidChart from './components/CovidCharts';

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
        <GenderChart/>
        <CrimeChart/>
        <DistrictChart/>
        <CovidChart/>
      </div>
    </div>
  );
  }

  export default App;

