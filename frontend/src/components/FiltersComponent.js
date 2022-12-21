import React, { useState, useEffect } from "react";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import "leaflet/dist/images/marker-shadow.png";


function FiltersComponent() {

  console.log("Ran filters")

  const [dataArray, setdataArray] = useState([]);
  const [newData, setNewData] = useState([]);

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
    //console.log(dataArray);
    console.log("Narrow data: useEffect ran");
    console.log(dataArray);

    // Create filter string
    const params = new URLSearchParams();

    dataArray.forEach((currentFilter) => {
      params.append('filter', currentFilter);
    });

    const filterURL = `http://127.0.0.1:5000/filters?${params.toString()}`;
    console.log("SETTING FILTERED DATA RN")
    console.log("With URL:", filterURL, "Params:", params.toString())



    // Use async/await to make the code more synchronous
    async function fetchAndUpdate() {
      try {
        const resp = await fetch(filterURL, {
          'method': 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const jsonResp = await resp.json();
        console.log("json resp", jsonResp);
        setNewData(jsonResp);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAndUpdate();

  }, [dataArray])


  // Declared Outside of useEffect
  let tileLayer;

  useEffect(() => {
    console.log("New Data has changed")
    console.log("Here is new data")
    console.log(newData)
    if (L.DomUtil.get('map') !== undefined) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });

    if (newData) {
      if (newData.length !== 0) {
        console.log("New data is valid", newData.length)


        var map;
        if (map) {
          map = map.off();
          map = map.remove();
        }


        if (map) {
          map.eachLayer(layer => map.removeLayer(layer));
          console.log("Removing layers")
        }
        console.log("Generate map: useEffect Ran")
        var container = L.DomUtil.get('map');
        if (container != null) {
          container._leaflet_id = undefined;
        }
        // use L to create a layer of a map, with a center coordinates [] of Baltimore and a zoom level of 12
        var centerOfBaltimore = [39.30420000, -76.59960000]
        var zoomLevel = 12;
        map = L.map("map").setView(centerOfBaltimore, zoomLevel);

        // Give this layer an online link to an opensource street map of the world & add to map

        // Get the number of layers on the map
        if (!tileLayer) {
          tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          });
          console.log("ADDING BASE LAYER TO MAP")
          tileLayer.addTo(map);
        } else {
          console.log("NOT ADDING BASE LAYER TO MAP")
        }


        // Gather [long,lat] coordinates from our array of coordinate arrays. points = [[lat,lng], [lat,lng], [lat,lng]]
        console.log("Pre plot")
        //console.log(newData.length)
        const points = newData
          ? newData.map((p) => {
            return [p["Longitude"], p["Latitude"]];
          })
          : []; // If no points are there return an empty 1d array [] rather than an empty 2d array [[]]

        // Create the heat layer with our coordinates & add to map 

        L.heatLayer(points).addTo(map);
        // Create an empty array to store the markers
        const markersList = [];

        // Iterate over the list of coordinates
        newData.forEach(crimeEntry => {
          //
          // Add a marker for each coordinate
          let currMarker = L.marker([crimeEntry["Longitude"], crimeEntry["Latitude"]]);
          // Bind a pop up to the marker with some text
          let popupDescription = crimeEntry['Crime_Despcription']
          let popupDate = crimeEntry['Date']
          let popupAge = crimeEntry['Age']
          let popupGender = crimeEntry['Gender']
          if (popupGender === 'M') {
            popupGender = 'Male'
          }
          if (popupGender === 'F') {
            popupGender = 'Female'
          }
          if (popupGender === 'U') {
            popupGender = 'Unknown'
          }
          if (popupAge === 0) {
            popupAge = 'Unknown'
          }
          let popupText = '<p><strong>Crime:</strong><br>' + popupDescription + '<br><strong>Date:</strong><br>' + popupDate + '<br><strong>Gender:</strong><br>' + popupGender + '<br><strong>Age:</strong><br>' + popupAge + '</p>';
          let imageUrl = 'https://i.pinimg.com/736x/ea/ec/69/eaec69cb893743cdb95f2e8853667c86.jpg'
          if (crimeEntry['Crime_Despcription'] === 'AUTO THEFT') {
            currMarker.bindPopup(`${popupText}<img src="${imageUrl}" alt="Image" width="80">`);
          } else {
            currMarker.bindPopup(`${popupText}`);
          }
          // Add the marker to the markers array
          markersList.push(currMarker);
        });

        // Add a listener to the map that checks the current zoom level
        // and shows or hides the markers based on the zoom level
        map.on("zoomend moveend", function () {
          if (map.getZoom() > 16) {
            // If the zoom level is greater than 17, get the bounds of the map view
            const bounds = map.getBounds();
            // Iterate over the markers
            markersList.forEach(marker => {
              // Check if the marker is inside the bounds of the map view
              if (bounds.contains(marker.getLatLng())) {
                // If the marker is inside the bounds, add it to the map
                marker.addTo(map);
              } else {
                // If the marker is not inside the bounds, remove it from the map
                marker.remove();
              }
            });
          } else {
            // If the zoom level is not greater than 17, remove the markers from the map
            markersList.forEach(marker => marker.remove());
          }
        });
      }
    }
  }, [newData])

  return (
    <>

      <div className="float-container">

        <div className="map-container">
          <div id="map" style={{ height: "100%", width: "100%", borderRadius: "8px", border: "none" }}></div>
        </div>
        <div className="filters-container">
          <header className="filters-title">
            <h1>Filters</h1>
          </header>
          <header className="filters-body">
            <div>
              <h3>Weapons</h3>

              <input
                type="checkbox"
                value='Weapon:FIREARM'
                onChange={e => handleChange(e)}
              />
              <span>Firearm</span>
              <br></br>

              <input
                type="checkbox"
                value='Weapon:KNIFE'
                onChange={e => handleChange(e)}
              />
              <span>Knife</span>
              <br></br>
              <input
                type="checkbox"
                value='Weapon:HANDS'
                onChange={e => handleChange(e)}
              />
              <span>Hands</span>
              <br></br>
              <input
                type="checkbox"
                value='Weapon:OTHER'
                onChange={e => handleChange(e)}
              />
              <span>Other</span>
              <br></br>
              <input
                type="checkbox"
                value='Weapon:NA'
                onChange={e => handleChange(e)}
              />
              <span>NA</span>
              <br></br>
              <br></br>

              <h3>Gender</h3>
              <br></br>
              <input
                type="checkbox"
                value='Gender:M'
                onChange={e => handleChange(e)}
              />
              <span>Male</span>
              <br></br>
              <input
                type="checkbox"
                value='Gender:F'
                onChange={e => handleChange(e)}
              />
              <span>Female</span>
              <br></br>
              <input
                type="checkbox"
                value='Gender:U'
                onChange={e => handleChange(e)}
              />
              <span>Unknown</span>
              <br></br>
              <br></br>

              <h3>District</h3>
              <br></br>
              <input
                type="checkbox"
                value='District:NORTHEAST'
                onChange={e => handleChange(e)}
              />
              <span>Northeast</span>
              <br></br>
              <input
                type="checkbox"
                value='District:EASTERN'
                onChange={e => handleChange(e)}
              />
              <span>Eastern</span>
              <br></br>
              <input
                type="checkbox"
                value='District:CENTRAL'
                onChange={e => handleChange(e)}
              />
              <span>Central</span>
              <br></br>
              <input
                type="checkbox"
                value='District:NORTHERN'
                onChange={e => handleChange(e)}
              />
              <span>Northern</span>
              <br></br>
              <input
                type="checkbox"
                value='District:SOUTHEAST'
                onChange={e => handleChange(e)}
              />
              <span>Southeast</span>
              <br></br>
              <input
                type="checkbox"
                value='District:SOUTHERN'
                onChange={e => handleChange(e)}
              />
              <span>Southern</span>
              <br></br>
              <input
                type="checkbox"
                value='District:NORTHWEST'
                onChange={e => handleChange(e)}
              />
              <span>Northwest</span>
              <br></br>
              <input
                type="checkbox"
                value='District:WESTERN'
                onChange={e => handleChange(e)}
              />
              <span>Western</span>
              <br></br>
              <input
                type="checkbox"
                value='District:SOUTHWEST'
                onChange={e => handleChange(e)}
              />
              <span>Southwest</span>
              <br></br>
              <br></br>

              <h3>Race</h3>
              <br></br>
              <input
                type="checkbox"
                value='Race:BLACK_OR_AFRICAN_AMERICAN'
                onChange={e => handleChange(e)}
              />
              <span>Black or African American</span>
              <br></br>
              <input
                type="checkbox"
                value='Race:WHITE'
                onChange={e => handleChange(e)}
              />
              <span>White</span>
              <br></br>
              <input
                type="checkbox"
                value='Race:ASIAN'
                onChange={e => handleChange(e)}
              />
              <span>Asian</span>
              <br></br>
              <input
                type="checkbox"
                value='Race:AMERICAN_INDIAN_OR_ALASKA_NATIVE'
                onChange={e => handleChange(e)}
              />
              <span>American Indian or Alaska Native</span>
              <br></br>
              <input
                type="checkbox"
                value='Race:UNKNOWN'
                onChange={e => handleChange(e)}
              />
              <span>Unknown</span>
              <br></br>
            </div>
          </header>
        </div>

      </div>
    </>
  );
}

export default FiltersComponent