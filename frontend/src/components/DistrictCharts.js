import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import { crimeData } from "../data/staticCrimeData";

/*extracts from list of dictionaries what type of districts there are and how many crimes occureed in that district*/
function GetDistrictData(ListOfDictionary){
    let districts = {};

    for(let i = 0; i < ListOfDictionary.length; i++)
    {
        let districtdesc = ListOfDictionary[i]["District"];
        if(districts[districtdesc])
        {
            districts[districtdesc]++;
        }else{
            districts[districtdesc] = 1;
        }
    }
    return districts
};

/*Used to get random color for charts later*/
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

/*Creates pie chart for crime by district*/
function DistrictChart(){
    /*coverts dictionary into an array that we can use for piechart*/
    const dataArray = Object.entries(GetDistrictData(crimeData)).map(([name, value]) => ({name, value}));

    return(
        <PieChart width={400} height ={400}>

        <text x ={200} y = {20} textAnchor="middle" fontSize={20}> 
        Crime By District
        </text>

        <Pie data={dataArray} dataKey="value" cx={200} cy={200} outerRadius={80}>
            {dataArray.map((entry, index) => (
                <Cell key={'cell-' + index} fill={getRandomColor()} value={entry.value}/>
     ))}
        </Pie>
        <Legend/>
        <Tooltip/>
        </PieChart>

    );

};
export default DistrictChart