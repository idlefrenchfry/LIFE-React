import React, { useState } from 'react';
import MultiSelect from '../components/MultiSelect';
import Recurring from '../components/Recurring';
import { cloneDeep } from 'lodash'; // To deep clone arrays with objects

let membersList = [
    {
        label: "Kim Yerim",
        value: "Kim Yerim"
    },
    {
        label: "Kai Wong",
        value: "Kai Wong"
    },
    {
        label: "Hit Monlee",
        value: "Hit Monlee"
    },
    {
        label: "Yi Tien",
        value: "Yi Tien"
    },
    {
        label: "Prianka Letchmanan",
        value: "Prianka Letchmanan"
    },
    {
        label: "Michael Henderson",
        value: "Michael Henderson"
    },
    {
        label: "Hae Chan",
        value: "Hae Chan"
    },
    {
        label: "Joshua Pei",
        value: "Joshua Pei"
    },
    {
        label: "Clefairy Lee",
        value: "Clefairy Lee"
    },
    {
        label: "Xue Ting",
        value: "Xue Ting"
    },
    {
        label: "Amane Ichigo",
        value: "Amane Ichigo"
    },
    {
        label: "Seung Wan",
        value: "Seung Wan"
    },
]

function AddTraining(props) {
    // Keep track of which section to display
    const [currentSection, setCurrentSection] = useState("tab1");
    // Keep track of training sessions
    const [sessionList, setSessionList] = useState([{
        location: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        coach: "",
        isRecurring: false,
        athletes: []
    }]);

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

    const handleSessionInputChange = (e) => {
        let value = e.target.value;
        let id = e.target.getAttribute("data-id");
        let replace = cloneDeep(sessionList);
        let inputName = e.target.getAttribute("name");

        let attr;

        // TO DO
        // Replace these lines by adding attribute: inputName to inputs
        if (inputName.includes("location"))
            attr = "location";

        else if (inputName.includes("startDate"))
            attr = "startDate";

        else if (inputName.includes("endDate"))
            attr = "endDate";

        else if (inputName.includes("startTime"))
            attr = "startTime";

        else if (inputName.includes("endTime"))
            attr = "endTime";

        else if (inputName.includes("recurring")) {
            replace[id]["isRecurring"] = e.target.checked;
            setSessionList(replace);
            return;
        }

        replace[id][attr] = value;
        setSessionList(replace);
    }

    const handleAddSession = () => {
        let newSession = {
            location: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            athletes: [],
            isRecurring: false
        };

        let newSessionList = cloneDeep(sessionList);
        newSessionList.push(newSession);

        setSessionList(newSessionList);
    }

    const handleAddAthlete = (option, id = "") => {
        id = parseInt(id);

        if (isNaN(id))
            console.error("id cannot be empty!")
        else {
            // Add option to eventInfoSections
            let replaceSessions = cloneDeep(sessionList);
            replaceSessions[id].athletes.push(option);

            // set state
            setSessionList(replaceSessions);
        }
    }

    const handleRmAthlete = (option, id = "") => {
        id = parseInt(id);

        if (isNaN(id))
            console.error("id cannot be empty!")
        else {
            // Remove option from eventInfoSections
            let replaceSessions = cloneDeep(sessionList);
            for (let i = 0; i < replaceSessions[id].athletes.length; i++) {
                if (replaceSessions[id].athletes[i].value === option.value) {
                    replaceSessions[id].athletes.splice(i, 1);
                    console.log("Option popped!")
                    break;
                }
            }

            // set state
            setSessionList(replaceSessions);
        }
    }

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
            <h1>{props.location.pathname.includes("Edit") ? "Edit Training" : "Add Training"}</h1>
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
                    {
                        sessionList.map((session, index) => {
                            return (
                                <div key={index} id={"session" + index}>
                                    <h3>Session {index + 1}</h3>
                                    <div className="inputs">
                                        {/* ---------- LOCATION ---------- */}
                                        <label htmlFor={"location" + index}>Location</label>
                                        <br />
                                        <input
                                            id={"location" + index}
                                            name={"location" + index}
                                            type="text"
                                            data-id={index}
                                            onChange={handleSessionInputChange}
                                        />
                                        <br />

                                        {/* Splitting */}
                                        <div className="split">
                                            {/* ---------- STARTS ---------- */}
                                            <div>
                                                <label htmlFor={"startDate" + index}>Start Training</label>
                                                <input
                                                    type="date"
                                                    id={"startDate" + index}
                                                    name={"startDate" + index}
                                                    data-id={index}
                                                    onChange={handleSessionInputChange}
                                                />
                                                <br />
                                            </div>

                                            {/* ---------- ENDS ---------- */}
                                            <div>
                                                <label htmlFor={"endDate" + index}>End Training</label>
                                                <input
                                                    type="date"
                                                    id={"endDate" + index}
                                                    name={"endDate" + index}
                                                    data-id={index}
                                                    onChange={handleSessionInputChange}
                                                />
                                                <br />
                                            </div>
                                        </div>
                                        <br />

                                        <div className="split">
                                            {/* ---------- TIME ---------- */}
                                            <div>
                                                <label htmlFor={"startTime" + index}>Time</label>
                                                <br />
                                                <input
                                                    type="time"
                                                    id={"startTime" + index}
                                                    name={"startTime" + index}
                                                    data-id={index}
                                                    onChange={handleSessionInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={"endTime" + index} style={{ visibility: "hidden" }}>End Time</label>
                                                <input
                                                    type="time"
                                                    id={"endTime" + index}
                                                    name={"endTime" + index}
                                                    data-id={index}
                                                    onChange={handleSessionInputChange}
                                                />
                                            </div>
                                        </div>
                                        <br />

                                        {/* ---------- RECURRING ---------- */}
                                        <label htmlFor={"recurring" + index}>Is this a recurring event?</label>
                                        <input
                                            type="checkbox"
                                            id={"recurring" + index}
                                            name={"recurring" + index}
                                            value="isRecurring"
                                            data-id={index}
                                            onChange={handleSessionInputChange}
                                        />
                                        <br />
                                        {session.isRecurring ? <Recurring id={index} /> : null}
                                    </div>
                                </div>
                            );
                        })
                    }
                    <input type="button" value="+ Add Training" onClick={handleAddSession} className="upperButton" />
                </div>

                <div style={displaySection("3")}>
                    {
                        sessionList.map((session, index) => {
                            let venueDateTimeError = "";
                            if (!session.startDate)
                                venueDateTimeError += "Date";
                            if (!session.startTime || !session.endTime)
                                venueDateTimeError += (venueDateTimeError ? ", time" : "Time");
                            if (!session.location)
                                venueDateTimeError += (venueDateTimeError ? " and location" : "Location");

                            return (
                                <div key={index} id={"session" + index}>
                                    <h3>Session {index + 1}</h3>
                                    <div className="inputs">
                                        {
                                            (venueDateTimeError ? 
                                                <div className="error">{venueDateTimeError} not entered!</div> :
                                                <div>
                                                    <span className="sessionDate">{formatDateInput(session.startDate)}, </span>
                                                    <span className="sessionTime">{session.startTime + " - " + session.endTime}</span>
                                                    <br />
                                                    <span className="sessionLocation">{session.location}</span>
                                                </div>
                                            )
                                        }
                                        <br />

                                        {/* ---------- COACH FOR SESSION ---------- */}
                                        <label htmlFor={"coach" + (index + 1)}>Coach</label>
                                        <br />
                                        <select id={"coach" + (index + 1)} name={"coach" + (index + 1)}>
                                            <option value="">Select a coach</option>
                                            <option value="Lynsey Atherton">Lynsey Atherton</option>
                                            <option value="Sullivan Guy">Sullivan Guy</option>
                                            <option value="Augustus Rhodes">Augustus Rhodes</option>
                                            <option value="Raees Chapman">Raees Chapman</option>
                                            <option value="Varun Wagstaff">Varun Wagstaff</option>
                                            <option value="Jagoda Martins">Jagoda Martins</option>
                                        </select>

                                        {/* ---------- ATHLETES FOR SESSION ---------- */}
                                        <label>Athletes</label>
                                        <br />
                                        <MultiSelect
                                            options={membersList}
                                            dataId={index}
                                            add={handleAddAthlete}
                                            rm={handleRmAthlete}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </form>
        </div>
    );
}

function formatDateInput(dateInput) {
    let dateObject = new Date(dateInput);
    return dateObject.toDateString();
}

export default AddTraining;
