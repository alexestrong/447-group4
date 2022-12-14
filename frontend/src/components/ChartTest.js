import React from "react";
import {Bar, Doughnut, Line} from "react-chartjs-2"
import { TheCovidData } from "../data/covidData";
import { Chart } from "chart.js/auto";

const data = {
    labels: TheCovidData.map((OtherData) => OtherData.date),
    datasets: [{
        label: "Number of cases",
        data: TheCovidData.map((OtherData) => OtherData.cases)
    }]
};

function ChartTests(){
    return(
        <div>
            <h1>Line Chart</h1>
            <Line data = {data}/>
            <h2>something</h2>
            <Bar data = {data}/>
            <Doughnut data = {data}/>
        </div>

    );

}
export default ChartTests;