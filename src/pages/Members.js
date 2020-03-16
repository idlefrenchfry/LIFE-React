import React, { useEffect, useState } from 'react';
import Table from '../components/Table';

//Dummy Data {Name, sports, contact number, status}
let membersList = [
    {
        name: "Kim Yerim",
        sports: "Archery",
        contact: "+65 9016 2738",
        status: "Casual"
    },
    {
        name: "Kai Wong",
        sports: "Basketball",
        contact: "+65 8720 5116",
        status: "Casual"
    },
    {
        name: "Hit Monlee",
        sports: "Football",
        contact: "+65 8732 2716",
        status: "Casual"
    },
    {
        name: "Yi Tien",
        sports: "Archery",
        contact: "+65 9345 8491",
        status: "Casual"
    },
    {
        name: "Prianka Letchmanan",
        sports: "Badminton",
        contact: "+65 8382 3490",
        status: "Athlete"
    },
    {
        name: "Michael Henderson",
        sports: "Badminton",
        contact: "+65 9103 8204",
        status: "Athlete"
    },
    {
        name: "Hae Chan",
        sports: "Basketball",
        contact: "+65 9384 0038",
        status: "Casual"
    },
    {
        name: "Joshua Pei",
        sports: "Table Tennis",
        contact: "+65 9322 7028",
        status: "Casual"
    },
    {
        name: "Clefairy Lee",
        sports: "Football",
        contact: "+65 8032 2010",
        status: "Ahtlete"
    },
    {
        name: "Xue Ting",
        sports: "Badminton",
        contact: "+65 9284 2880",
        status: "Athlete"
    },
    {
        name: "Amane Ichigo",
        sports: "Football",
        contact: "+65 9384 1031",
        status: "Casual"
    },
    {
        name: "Seung Wan",
        sports: "Badminton",
        contact: "+65 8278 9283",
        status: "Athlete"
    },
]

function Members() {

    // async function to fetch members
    const fetchMembers = () => {
        const data = membersList;
        setMembers(data);
    };

    // useEffect to call async function
    useEffect(() => {
        fetchMembers();
    });

    // set use state
    const [members, setMembers] = useState([{}]);

    return (
        <div className="card">
            <h1>Members.js</h1>
            <Table data={members} columns={Object.keys(members[0])} />
        </div>
    );
}

export default Members;
