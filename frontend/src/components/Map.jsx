import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
//import { addressPoints } from "../data/addressPoints";
//import { addPoints } from "../data/testpoints";
import { addPoints } from "../data/crimepoints";

export default function Map() {

    // We need to store addressPoints passed in as a prop...
    // We need useState [addressPoints, setAddressPoints]...
    // Then use "addressPoints" as a dependency condition to redraw the heat layer



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

        // Gather [lat,long] coordinates from our array of coordinate arrays. points = [[lat,lng], [lat,lng], [lat,lng]]
        const points = addPoints
        ? addPoints.map((p) => {
            return [p[0], p[1]];
        })
        : []; // If no points are there return an empty 1d array [] rather than an empty 2d array [[]]
        
        // Create the heat layer with our coordinates & add to map 
        L.heatLayer(points, {
            radius: 20 // Modification of default radius to make the map more readable
        }).addTo(map);




    }, []);


    // Return the map with styling to fill the MapContainer
    return <div id="map" style={{ height: "100%", width: "100%", borderRadius: "8px", border: "none"}}></div>;
}