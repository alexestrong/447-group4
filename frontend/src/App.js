import FiltersComponent from './components/FiltersComponent';
import './App.css';
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


      <FiltersComponent />

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

