import React, { useState, useEffect } from "react";

function FiltersComponent() {

  console.log("Ran filters")

  const [dataArray, setdataArray] = useState([]);

  const handleChange = (e) => {
    // setisChecked(e.target.checked);
    if (e.target.checked === true) {
      setdataArray([...dataArray, e.target.value]);
    }
    else if (e.target.checked === false) {
      let freshArray = dataArray.filter(val => val !== e.target.value);
      setdataArray([...freshArray]);
    }
  }

  useEffect(() => {
    console.log(dataArray);
    //fetch('http://127.0.0.1:5000/resetFilter', {
    //'method': 'GET',
    //headers: {
    //'Content-Type': 'application/json'
    //}
    //})
    //let starterURL = 'http://127.0.0.1:5000/'
    //dataArray.forEach(currentFilter => {
    // Check if the marker is inside the bounds of the map view
    //let completeURL = starterURL + currentFilter
    //fetch(completeURL, {
    //'method': 'GET',
    //headers: {
    //'Content-Type': 'application/json'
    //}
    //})
    //})



  }, [dataArray]);




  return (
    <>

      <div>
        <h3>Weapons</h3>

        <input
          type="checkbox"
          value='weapon_firearm'
          onChange={e => handleChange(e)}
        />
        <span>Firearm</span>
        <br></br>

        <input
          type="checkbox"
          value='weapon_knife'
          onChange={e => handleChange(e)}
        />
        <span>Knife</span>
        <br></br>
        <input
          type="checkbox"
          value='weapon_hands'
          onChange={e => handleChange(e)}
        />
        <span>Hands</span>
        <br></br>
        <input
          type="checkbox"
          value='weapon_other'
          onChange={e => handleChange(e)}
        />
        <span>Other</span>
        <br></br>
        <input
          type="checkbox"
          value='weapon_na'
          onChange={e => handleChange(e)}
        />
        <span>NA</span>
        <br></br>
        <br></br>

        <h3>Gender</h3>

        <input
          type="checkbox"
          value='gender_m'
          onChange={e => handleChange(e)}
        />
        <span>Male</span>
        <br></br>
        <input
          type="checkbox"
          value='gender_f'
          onChange={e => handleChange(e)}
        />
        <span>Female</span>
        <br></br>
        <input
          type="checkbox"
          value='gender_u'
          onChange={e => handleChange(e)}
        />
        <span>Unknown</span>
        <br></br>
        <br></br>

        <h3>District</h3>
        <input
          type="checkbox"
          value='district_northeast'
          onChange={e => handleChange(e)}
        />
        <span>Northeast</span>
        <br></br>
        <input
          type="checkbox"
          value='district_eastern'
          onChange={e => handleChange(e)}
        />
        <span>Eastern</span>
        <br></br>
        <input
          type="checkbox"
          value='district_central'
          onChange={e => handleChange(e)}
        />
        <span>Central</span>
        <br></br>
        <input
          type="checkbox"
          value='district_northern'
          onChange={e => handleChange(e)}
        />
        <span>Northern</span>
        <br></br>
        <input
          type="checkbox"
          value='district_southeast'
          onChange={e => handleChange(e)}
        />
        <span>Southeast</span>
        <br></br>
        <input
          type="checkbox"
          value='district_southern'
          onChange={e => handleChange(e)}
        />
        <span>Southern</span>
        <br></br>
        <input
          type="checkbox"
          value='district_northwest'
          onChange={e => handleChange(e)}
        />
        <span>Northwest</span>
        <br></br>
        <input
          type="checkbox"
          value='district_western'
          onChange={e => handleChange(e)}
        />
        <span>Western</span>
        <br></br>
        <input
          type="checkbox"
          value='district_southwest'
          onChange={e => handleChange(e)}
        />
        <span>Southwest</span>
        <br></br>
        <br></br>

        <h3>Race</h3>

        <input
          type="checkbox"
          value='race_black_or_african_american'
          onChange={e => handleChange(e)}
        />
        <span>Black or African American</span>
        <br></br>
        <input
          type="checkbox"
          value='race_white'
          onChange={e => handleChange(e)}
        />
        <span>White</span>
        <br></br>
        <input
          type="checkbox"
          value='race_asian'
          onChange={e => handleChange(e)}
        />
        <span>Asian</span>
        <br></br>
        <input
          type="checkbox"
          value='race_american_indian_or_alaska_native'
          onChange={e => handleChange(e)}
        />
        <span>American Indian or Alaska Native</span>
        <br></br>
        <input
          type="checkbox"
          value='race_unknown'
          onChange={e => handleChange(e)}
        />
        <span>Unknown</span>
        <br></br>
      </div>
    </>
  )
}

export default FiltersComponent