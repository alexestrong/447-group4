import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import { crimeData } from "../data/staticCrimeData";

/*Get the crimes that were done by males */
function GetMaleCount(ListOfDictionary){
    let MaleCount = 0;
    
    for (let i = 0; i<ListOfDictionary.length; i++)
    {
        if(ListOfDictionary[i]["Gender"] === "M")
        {
            MaleCount++;
        }
    }

    return MaleCount    
}

/*Get the number of crimes that were done by females */
function GetFemaleCount(ListOfDictionary){
    let FemaleCount = 0;
    
    for (let i = 0; i<ListOfDictionary.length; i++)
    {
        if(ListOfDictionary[i]["Gender"] === "F")
        {
            FemaleCount++;
        }
    }

    return FemaleCount    
}

/*Data that we will be using for pie chart */
const Genderdata = [
    {name: "Male", count: GetMaleCount(crimeData)},
    {name: "Female", count: GetFemaleCount(crimeData)},
    {name: "Unknown", count: 2},
  ];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

/*Creates the pie chart */
function GenderChart(){
    return(
        <PieChart width={400} height ={400}>

        <text x ={200} y = {20} textAnchor="middle" fontSize={20}> 
        Crime By Gender 
        </text>

        <Pie data={Genderdata} dataKey="count" cx={200} cy={200} outerRadius={80}>
            {Genderdata.map((entry, index) => (
            <Cell key={'cell-' + index} fill={COLORS[index % COLORS.length]} value={entry.count} />
     ))}
        </Pie>
        <Legend/>
        <Tooltip/>
        </PieChart>
    );
};
export default GenderChart