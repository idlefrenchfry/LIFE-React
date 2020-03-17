import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import ButtonsSet from '../components/ButtonsSet';

let trainingsList = []

function Trainings() {
        
    // set coaches
    const [trainings, setTrainings] = useState([]);

    // async function to fetch coaches and set them
    function fetchTrainings() {
        let data = trainingsList;
        setTrainings(data);
    }

    // useEffect to call async function
    useEffect(() => {
        fetchTrainings();
    }, [trainingsList]);

    return (
        <div className="card">
            <div className="cardTop">
                <h1>Trainings</h1>
                <ButtonsSet module={"Trainings"} dataToExport={Trainings} />
            </div>
            {trainings.length !== 0 ? <Table data={trainings} columns={Object.keys(trainings[0])} /> : <p>Loading...</p>}
        </div>
    );
}

export default Trainings;
