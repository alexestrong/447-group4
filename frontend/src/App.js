import { useState } from "react";
import { filt } from './components/Filters'
import './App.css';
import Map from './components/Map';
import React from 'react';


export default function App() {
  const [checkedState, setCheckedState] = useState(
    new Array(filt.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };


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
            Filters
          </header>
          <div className="filters-body">
            {filt.map(({ name, type }, index) => {
            return (
              <li key={index}>
                <div className="filt-list-item">
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                  </div>
                  <div className="right-section">{type}</div>
                </div>
              </li>
            );
        })}
            {/* <h4>Weapons</h4>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
            <label className="form-check-label" for="inlineCheckbox1">Weapon type 1</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
            <label className="form-check-label" for="inlineCheckbox1">Weapon type 2</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
            <label className="form-check-label" for="inlineCheckbox1">Weapon type 3</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
            <label className="form-check-label" for="inlineCheckbox1">Weapon type 4</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
            <label className="form-check-label" for="inlineCheckbox1">Weapon type 5</label>
            </div>
            <br/>
            <h4>Gender</h4>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
              <label className="form-check-label" for="inlineCheckbox2">Female</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
              <label className="form-check-label" for="inlineCheckbox3">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
              <label className="form-check-label" for="inlineCheckbox3">Unknown</label>
            </div>
            <br/>
            <h4>Districts</h4>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
              <label className="form-check-label" for="inlineCheckbox3">District 1 </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
              <label className="form-check-label" for="inlineCheckbox3">District 2 </label>
            </div>
            <br/>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
              <label className="form-check-label" for="inlineCheckbox3">District 3 </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
              <label className="form-check-label" for="inlineCheckbox3">District 4 </label>
            </div>
            <br/>
            <h4>Race</h4>
            <br/>
            <h4>Date</h4>
            <br/>
            <button type="button" class="btn btn-primary btn-sm">Save</button> */}
          </div>
        </div>

      </div>

      <div className="charts-container">
        Charts will go here
      </div>


    </div>
  );
}
