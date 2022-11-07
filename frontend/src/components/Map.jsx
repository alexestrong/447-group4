import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
//import { addressPoints } from "../data/addressPoints";
import { addPoints } from "../data/testpoints";

export default function Map() {
    useEffect(() => {
        var map = L.map("map").setView([39.30420000,-76.59960000], 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // const points = addressPoints
        //     ? addressPoints.map((p) => {
        //         return [p[0], p[1]];
        //     })
        //     : [];

        // <TileLayer
        //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //   url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />



        const points = addPoints
        ? addPoints.map((p) => {
            return [p[0], p[1]];
        })
        : [];
        
        L.heatLayer(points).addTo(map);
        
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }, []);



    return <div id="map" style={{ height: "100%", width: "100%", borderRadius: "8px", border: "none"}}></div>;
}