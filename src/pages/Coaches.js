import React, { useEffect, useState } from 'react';
import Table from '../components/Table';

let coachesList = [
    {
        name: "Lynsey Atherton",
        sports: "Basketball",
        contact: "+65 9284 2718"
    },
    {
        name: "Sullivan Guy",
        sports: "Badminton",
        contact: "+65 8247 0284"
    },
    {
        name: "Raees Chapman",
        sports: "Football",
        contact: "+65 9399 8473"
    },
    {
        name: "Varun Wagstaff",
        sports: "Archery",
        contact: "+65 8174 2023"
    },
    {
        name: "Jagoda Martins",
        sports: "Badminton",
        contact: "+65 9385 1932"
    },
    {
        name: "Augustus Rhodes",
        sports: "Badminton",
        contact: "+65 9596 3393"
    },
    {
        name: "Bae Joohyun",
        sports: "Football",
        contact: "+65 9381 3590"
    },
    {
        name: "Layan Ferrell",
        sports: "Table Tennis",
        contact: "+65 8182 2948"
    },
    {
        name: "Farrell Deleon",
        sports: "Table Tennis",
        contact: "+65 8949 3929"
    },
    {
        name: "Kang Seulgi",
        sports: "Badminton",
        contact: "+65 8293 9424"
    },
    {
        name: "Park Sooyoung",
        sports: "Basketball",
        contact: "+65 9295 7377"
    },
    {
        name: "Shaurya Lucero",
        sports: "Badminton",
        contact: "+65 9173 7739"
    },
]

function Coaches() {
    // async function to fetch members
    const fetchCoaches = () => {
        const data = coachesList;
        setCoaches(data);
    };

    // useEffect to call async function
    useEffect(() => {
        fetchCoaches();
    }, []);

    // set coaches
    const [coaches, setCoaches] = useState([{}]);

    return (
        <div className="card">
            <h1>Coaches.js</h1>
            <Table list={coaches} headers={Object.keys(coaches[0])} />
        </div>
    );
}

export default Coaches;
