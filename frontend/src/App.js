import FiltersComponent from './components/FiltersComponent';
import './App.css';
import React from 'react';

function App(){
  return (
    <div className="App">

      <header className="App-header">
      Baltimore Crime and COVID tracker
      </header>


      <FiltersComponent />

      <div className="charts-container">
        Charts will go here
      </div>


    </div>
  );
  }

  export default App;

