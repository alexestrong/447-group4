import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { crimeData } from "../data/staticCrimeData";
import "leaflet/dist/images/marker-shadow.png";


export default function Map() {

    console.log("Ran map")
    // We need to store addressPoints passed in as a prop...
    // We need useState [addressPoints, setAddressPoints]...
    // Then use "addressPoints" as a dependency condition to redraw the heat layer

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });

    /* 
    useEffect(<function>, <dependency>)
    -   In React, useEffect will have a "dependency" that WHEN CHANGED,
        it will trigger a "function" to run.
    -   If the dependency is an empty array, then the function will only
        run once upon the first page load
    https://www.w3schools.com/react/react_useeffect.asp

    In our case here, there is no dependency, which means this 
    arrow function will only be ran on every render
    */
    var map;
    useEffect(() => {
        var container = L.DomUtil.get('map');
        if (container != null) {
            container._leaflet_id = null;
        }
        // use L to create a layer of a map, with a center coordinates [] of Baltimore and a zoom level of 12
        var centerOfBaltimore = [39.30420000, -76.59960000]
        var zoomLevel = 12;
        map = L.map("map").setView(centerOfBaltimore, zoomLevel);



        // Give this layer an online link to an opensource street map of the world & add to map
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Gather [long,lat] coordinates from our array of coordinate arrays. points = [[lat,lng], [lat,lng], [lat,lng]]
        const points = crimeData
            ? crimeData.map((p) => {
                return [p["Longitude"], p["Latitude"]];
            })
            : []; // If no points are there return an empty 1d array [] rather than an empty 2d array [[]]

        // Create the heat layer with our coordinates & add to map 

        L.heatLayer(points).addTo(map);

        // Create an empty array to store the markers
        const markersList = [];

        // Iterate over the list of coordinates
        crimeData.forEach(crimeEntry => {
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
                console.log("Age is" + popupAge)
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
            if (map.getZoom() > 17) {
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
    }, [crimeData]);


    // Return the map with styling to fill the MapContainer
    return <div id="map" style={{ height: "100%", width: "100%", borderRadius: "8px", border: "none" }}></div>;
}