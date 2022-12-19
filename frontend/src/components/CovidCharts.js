import React from "react";
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from "recharts";

/*Test data for covid charts */
import { CovidData } from "../data/CovidDataTest";

/*REPLACE THE data={COVID DATA} with real data for to fix chart*/

function CovidChart(){    
    return(        
        <LineChart width={500} height={300} data={CovidData} margin={{top: 50}}>
            <text x ={200} y = {20} textAnchor="middle" fontSize={20} > 
                 Covid Data
            </text>

            <XAxis dataKey="date"/>
            <YAxis/>
            <Legend/>
            <Tooltip/>
            <CartesianGrid stroke="#ccc"/>
            <Line type="monotone" dataKey="cases" stroke="#8884d8" />
            <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
        </LineChart>
    );
};
export default CovidChart