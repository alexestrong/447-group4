import FiltersComponent from './components/FiltersComponent';
import './App.css';
import React from 'react';
import GenderChart from './components/GenderCharts';
import CrimeChart from './components/CrimeTypeCharts';
import DistrictChart from './components/DistrictCharts';
import CovidChart from './components/CovidCharts';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <h1>Baltimore Crime and COVID tracker</h1>
        <nav>

          <a href="https://usafacts.org/visualizations/coronavirus-covid-19-spread-map/state/maryland/county/baltimore-county">Covid data source</a>
          <a href="https://data.baltimorecity.gov/datasets/baltimore::part-1-crime-data-/explore">Crime data source</a>
          <a href="https://wall.alphacoders.com/big.php?i=647161">Background source</a>
        </nav>
      </header>

      <header className="App-footer-team">
        <h5>Team 4</h5>
      </header>

      <FiltersComponent />

      <div className="charts-container">
        <GenderChart />
        <CrimeChart />
        <DistrictChart />
        <CovidChart />
      </div>
    </div>
  );
}

export default App;