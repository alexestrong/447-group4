import React from "react";
import { crimeData } from "../data/staticCrimeData";
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from "recharts";

/* loops through list of dictionaries and extracts the what type of crimes happened and how many times it happened*/
/* stores result in a dictionary */
function GetCrimeData(ListOfDictionary){
    let crimes = {};

    for(let i = 0; i < ListOfDictionary.length; i++)
    {
        let crimedesc = ListOfDictionary[i]["Crime_Despcription"];
        if(crimes[crimedesc])
        {
            crimes[crimedesc]++;
        }else{
            crimes[crimedesc] = 1;
        }
    }
    return crimes
};

/*creayes barchart for types of crime*/
function CrimeChart(){
    /*turns the dictionary into an array that can be used for the chart data */
    const dataArray = Object.entries(GetCrimeData(crimeData)).map(([name, cases]) => ({name, cases}));

    return(
        <BarChart width={500} height={300} data = {dataArray} margin={{top: 50}}>
            <text x ={200} y = {20} textAnchor="middle" fontSize={20} > 
             Crime By Type
            </text>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Bar dataKey={"cases"} />
        <Legend/>
        <Tooltip/>
        </BarChart>

    );
};
export default CrimeChart