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
        <input
          type="checkbox"
          value='Monday'
          onChange={e => handleChange(e)}
        />
        <span>Monday</span>

        <input
          type="checkbox"
          value='Tuesday'
          onChange={e => handleChange(e)}
        />
        <span>Tuesday</span>
        <input
          type="checkbox"
          value='Wednesday'
          onChange={e => handleChange(e)}
        />
        <span>Wednesday</span>
        <input
          type="checkbox"
          value='Thursday'
          onChange={e => handleChange(e)}
        />
        <span>Thursday</span>
        <input
          type="checkbox"
          value='Friday'
          onChange={e => handleChange(e)}
        />
        <span>Friday</span>
        <input
          type="checkbox"
          value='Saturday'
          onChange={e => handleChange(e)}
        />
        <span>Saturday</span>
        <input
          type="checkbox"
          value='Sunday'
          onChange={e => handleChange(e)}
        />
        <span>Sunday</span>
      </>
    )
}

export default FiltersComponent