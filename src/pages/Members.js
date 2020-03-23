import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import ButtonsSet from '../components/ButtonsSet';

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

     // set members
     const [members, setMembers] = useState([]);

     // async function to fetch coaches and set them
     function fetchMembers() {
         let data = membersList;
         setMembers(data);
     }
 
     // useEffect to call async function, called once at the start
     useEffect(() => {
         fetchMembers();
     }, []);

    return (
        <div className="card">
            <div className="cardTop">
                <h1>Members</h1>
                <ButtonsSet module={"Members"} dataToExport={members} addPage="/Members/Add" />
            </div>
            {members.length !== 0 ? <Table data={members} columns={Object.keys(members[0])} /> : <p>Loading...</p>}
        </div>
    );
}

export default Members;
