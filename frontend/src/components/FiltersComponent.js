import React, { useState, useEffect } from "react";

function FiltersComponent() {

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

    }, [dataArray]);




    return (
      <>
      <div>
        <h2><u>Filters</u></h2>
        <h3>Weapons</h3>

        <input
          type="checkbox"
          value='FIREARM'
          onChange={e => handleChange(e)}
        />
        <span>Firearm</span>
        <br></br>

        <input
          type="checkbox"
          value='KNIFE'
          onChange={e => handleChange(e)}
        />
        <span>Knife</span>
        <br></br>
        <input
          type="checkbox"
          value='HANDS'
          onChange={e => handleChange(e)}
        />
        <span>Hands</span>
        <br></br>
        <input
          type="checkbox"
          value='OTHER'
          onChange={e => handleChange(e)}
        />
        <span>Other</span>
        <br></br>
        <input
          type="checkbox"
          value='NA'
          onChange={e => handleChange(e)}
        />
        <span>NA</span>
        <br></br>
        <br></br>

        <h3>Gender</h3>

        <input
          type="checkbox"
          value='M'
          onChange={e => handleChange(e)}
        />
        <span>Male</span>
        <br></br>
        <input
          type="checkbox"
          value='F'
          onChange={e => handleChange(e)}
        />
        <span>Female</span>
        <br></br>
        <input
          type="checkbox"
          value='U'
          onChange={e => handleChange(e)}
        />
        <span>Unknown</span>
        <br></br>
        <br></br>

        <h3>District</h3>
        <input
          type="checkbox"
          value='NORTHEAST'
          onChange={e => handleChange(e)}
        />
        <span>Northeast</span>
        <br></br>
        <input
          type="checkbox"
          value='EASTERN'
          onChange={e => handleChange(e)}
        />
        <span>Eastern</span>
        <br></br>
        <input
          type="checkbox"
          value='CENTRAL'
          onChange={e => handleChange(e)}
        />
        <span>Central</span>
        <br></br>
        <input
          type="checkbox"
          value='NORTHERN'
          onChange={e => handleChange(e)}
        />
        <span>Northern</span>
        <br></br>
        <input
          type="checkbox"
          value='SOUTHEAST'
          onChange={e => handleChange(e)}
        />
        <span>Southeast</span>
        <br></br>
        <input
          type="checkbox"
          value='SOUTHERN'
          onChange={e => handleChange(e)}
        />
        <span>Southern</span>
        <br></br>
        <input
          type="checkbox"
          value='NORTHWEST'
          onChange={e => handleChange(e)}
        />
        <span>Northwest</span>
        <br></br>
        <input
          type="checkbox"
          value='WESTERN'
          onChange={e => handleChange(e)}
        />
        <span>Western</span>
        <br></br>
        <input
          type="checkbox"
          value='SOUTHWEST'
          onChange={e => handleChange(e)}
        />
        <span>Southwest</span>
        <br></br>
        <br></br>

        <h3>Race</h3>

        <input
          type="checkbox"
          value='BLACK_OR_AFRICAN_AMERICAN'
          onChange={e => handleChange(e)}
        />
        <span>Black or African American</span>
        <br></br>
        <input
          type="checkbox"
          value='WHITE'
          onChange={e => handleChange(e)}
        />
        <span>White</span>
        <br></br>
        <input
          type="checkbox"
          value='ASIAN'
          onChange={e => handleChange(e)}
        />
        <span>Asian</span>
        <br></br>
        <input
          type="checkbox"
          value='AMERICAN_INDIAN_OR_ALASKA_NATIVE'
          onChange={e => handleChange(e)}
        />
        <span>American Indian or Alaska Native</span>
        <br></br>
        <input
          type="checkbox"
          value='UNKNOWN'
          onChange={e => handleChange(e)}
        />
        <span>Unknown</span>
        <br></br>
        </div>
      </>
    )
}

export default FiltersComponent