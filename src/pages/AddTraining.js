import React, { useState } from 'react';
import MultiSelect from '../components/MultiSelect';

function AddTraining() {
    // Keep track of which section to display
    const [currentSection, setCurrentSection] = useState("tab1");

    // onClick function to execute when changing section
    const changeSection = (e) => {
        if (e.target.id !== currentSection)
            setCurrentSection(e.target.id);
    };

    // Return different styles depending on current section
    const displaySection = (id) => {
        if (currentSection.slice(-1) !== id)
            return { display: "none" };
        else
            return { display: "block" };
    };

    // Change style of tab depending on current section
    const displayTab = (id) => {
        if (currentSection.slice(-1) === id)
            return "currentTab noselect";
        else
            return "noselect";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(e.target.elements);
        // window.location.href = "/Members";
    };

    const cancel = () => window.location.href = "/Trainings";

    return (
        <div className="card">
            <div className="cardTop">
                <h1>Add Trainings</h1>
                <div className="buttonsSet">
                    <button onClick={cancel} className="noselect">Cancel</button>
                    <button form="form" className="noselect" id="submit">Save As Draft</button>
                    <button form="form" className="noselect" id="submit">Publish</button>
                </div>
            </div>

            <div className="sections">
                <span onClick={changeSection} className={displayTab("1")} id="tab1">Training Details</span>
                <span onClick={changeSection} className={displayTab("2")} id="tab2">Training Sessions</span>
                <span onClick={changeSection} className={displayTab("3")} id="tab3">Athletes</span>
            </div>

            <form id="form" onSubmit={handleSubmit}>
                <div style={displaySection("1")}>
                    <div id="basicInfo">
                        <h3>Basic Information</h3>
                        <div className="inputs">
                            {/* ---------- TRAINING TITLE ---------- */}
                            <label htmlFor="trainingTitle">Training Title</label>
                            <br />
                            <input id="trainingTitle" name="trainingTitle" type="text"></input>
                            <br />

                            {/* ---------- TRAINING TITLE ---------- */}
                            <label htmlFor="sportsCategory">Training Title</label>
                            <br/>
                            <select id="sportsCategory" name="sportsCategory">
                                <option value="">Sports</option>
                                <option value="archery">Archery</option>
                                <option value="badminton">Badminton</option>
                                <option value="basketball">Basketball</option>
                                <option value="football">Football</option>
                                <option value="table tennis">Table Tennis</option>
                            </select>
                            <br />

                            {/* ---------- TRAINING DESCRIPTION ---------- */}
                            <label htmlFor="trainingDesc">Training Description</label>
                            <br />
                            <textarea
                                id="trainingDesc"
                                name="trainingDesc"
                                type="text"
                                rows="5"
                                placeholder="Type in training description"
                            />
                            <br />

                            {/* ---------- DOCUMENTS ---------- */}
                            <label htmlFor="trainingImg">Training Image</label>
                            <br />
                            <input id="trainingImg" name="trainingImg" type="file"></input>
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("2")}>
                    <div id="session1">
                        <h3>Session 1</h3>
                        <div className="inputs">
                            {/* ---------- LOCATION ---------- */}
                            <label htmlFor="location">Location</label>
                            <br />
                            <input id="trainingTitle" name="trainingTitle" type="text"></input>
                            <br />

                            {/* Splitting */}
                            <div className="split">
                                {/* ---------- STARTS ---------- */}
                                <div>
                                    <label htmlFor="startTraining">Start Training</label>
                                    <input type="date" id="startTraining" name="startTraining" />
                                    <br />
                                </div>

                                {/* ---------- ENDS ---------- */}
                                <div>
                                    <label htmlFor="endTraining">End Training</label>
                                    <input type="date" id="endTraining" name="endTraining" />
                                    <br />
                                </div>
                            </div>
                            <br />

                            <div className="split">
                                {/* ---------- TIME ---------- */}
                                <div>
                                    <label htmlFor="startTime">Time</label>
                                    <br />
                                    <input type="time" id="startTime" name="startTime" />
                                </div>
                                <div>
                                    <label htmlFor="endTime" style={{ visibility: "hidden" }}>End Time</label>
                                    <input type="time" id="endTime" name="endTime" />
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <input type="button" value="+ Add Training (Doesn't work yet)" className="dynamicButton" />
                </div>

                <div style={displaySection("3")}>
                    <div id="athlete1">
                        <h3>Session 1</h3>
                        <div className="inputs">
                            To be implemented....
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddTraining;
