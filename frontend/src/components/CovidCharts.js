import React from "react";
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from "recharts";

/*Test data for covid charts */
import { covidData } from "../data/staticCovidData";

/*REPLACE THE data={COVID DATA} with real data for to fix chart*/

function CovidChart(){    
    return(        
        <LineChart width={500} height={300} data={covidData} margin={{top: 50}}>
            <text x ={200} y = {20} textAnchor="middle" fontSize={20} > 
                 Covid Data
            </text>

            <XAxis dataKey="covid_date"/>
            <YAxis/>
            <Legend/>
            <Tooltip/>
            <CartesianGrid stroke="#ccc"/>
            <Line type="monotone" dataKey="covid_number_case" stroke="#8884d8" />
            <Line type="monotone" dataKey="covid_number_deaths" stroke="#82ca9d" />
        </LineChart>
    );
};
export default CovidChart