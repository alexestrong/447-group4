import React, { useState, useEffect } from 'react'
import LoadingComponent from './LoadingComponent';
import MapComponent from './MapComponent';
import LoadCountiesTask from "../tasks/LoadCountiesTask"

function CrimeComponent() {
    const [counties, setCounties] = useState([]);

    const load = () => {
        const loadCountiesTask = new LoadCountiesTask();
        loadCountiesTask.load(setCounties);
    };

    useEffect(load, []) // This will call the function load. Tracks nothing, will only call load on first website load

    return (
        <div>
            {counties.length === 0 ? <LoadingComponent /> : <div><MapComponent /></div>}
        </div>
    )
}

export default CrimeComponent