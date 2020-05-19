import React, { useState, useEffect } from 'react';
import MultiSelect from '../components/MultiSelect';
import Recurring from '../components/Recurring';
import { ISOStringToDateInput } from '../CommonFunctions';
import trainingsList from '../pages/data/Trainings.json'
import membersList from '../pages/data/Members.json'
import { cloneDeep } from 'lodash'; // To deep clone arrays with objects

// let membersList = [
//     {
//         label: "Kim Yerim",
//         value: "Kim Yerim"
//     },
//     {
//         label: "Kai Wong",
//         value: "Kai Wong"
//     },
//     {
//         label: "Hit Monlee",
//         value: "Hit Monlee"
//     },
//     {
//         label: "Yi Tien",
//         value: "Yi Tien"
//     },
//     {
//         label: "Prianka Letchmanan",
//         value: "Prianka Letchmanan"
//     },
//     {
//         label: "Michael Henderson",
//         value: "Michael Henderson"
//     },
//     {
//         label: "Hae Chan",
//         value: "Hae Chan"
//     },
//     {
//         label: "Joshua Pei",
//         value: "Joshua Pei"
//     },
//     {
//         label: "Clefairy Lee",
//         value: "Clefairy Lee"
//     },
//     {
//         label: "Xue Ting",
//         value: "Xue Ting"
//     },
//     {
//         label: "Amane Ichigo",
//         value: "Amane Ichigo"
//     },
//     {
//         label: "Seung Wan",
//         value: "Seung Wan"
//     },
// ]

// const training = {
//     id: 18,
//     name: "Archery Training",
//     sports: "Archery",
//     trainingDesc: "Training description for this training",
//     sessions: [
//         {
//             location: "Yio Chu Kang Stadium",
//             startDate: "2020-06-22T16:00:00.000Z",
//             endDate: "2020-08-22T16:00:00.000Z",
//             startTime: "12:00",
//             endTime: "14:00",
//             coach: "Varun Wagstaff",
//             isRecurring: false,
//             athletes: [
//                 {
//                     label: "Joshua Pei",
//                     value: "Joshua Pei"
//                 },
//                 {
//                     label: "Clefairy Lee",
//                     value: "Clefairy Lee"
//                 }
//             ]
//         },

//         {
//             location: "Singapore Sports Hub",
//             startDate: "2020-05-22T00:00:00.000Z",
//             endDate: "2020-09-22T00:00:00.000Z",
//             startTime: "16:00",
//             endTime: "18:00",
//             coach: "Augustus Rhodes",
//             isRecurring: false,
//             athletes: [
//                 {
//                     label: "Kai Wong",
//                     value: "Kai Wong"
//                 }
//             ]
//         }
//     ],
//     publishStatus: true
// }

const emptyTraining = {
    name: "",
    sports: "",
    trainingDesc: "",
    location: "",
    sessions: [{
        location: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        coach: "",
        isRecurring: false,
        athletes: []
    }],
    publishStatus: ""
}

function AddTraining(props) {
    // If edit page, wait for event to fetch before rendering
    const [isBusy, setIsBusy] = useState(props.location.pathname.includes("/Trainings/Edit/") ? {fetch: true, sessionList: true} : {fetch: false, sessionList: false});

    // Keep track of which section to display
    const [currentSection, setCurrentSection] = useState("tab1");

    const [trainingDetails, setTrainingDetails] = useState(emptyTraining);

    useEffect(() => {
        if(props.location.pathname.includes("Trainings/Edit/")) {
            if (isBusy.fetch) {
                let data;
                for (let i = 0; i < trainingsList.length; i++) {
                    const training = trainingsList[i];
                    if (training.id === parseInt(props.match.params.id)) {
                        data = training;
                        break;
                    }
                }
                if (data) {
                    setTrainingDetails(data);
                    setIsBusy({ fetch: false, sessionList: true });
                }
                else
                    setIsBusy({ fetch: false, sessionList: false, failed: true})
            }

            // set select options when everything has been rendered
            else if (!isBusy.sessionList) {
                // Since default value doesn't work for select options
                let selectInputs = document.getElementsByTagName("select");
                for (let i = 0; i < selectInputs.length; i++) {
                    let select = selectInputs[i];
                    let selectId = select.id;
                    if (trainingDetails[selectId]) {
                        let options = select.childNodes;
                        for (let index = 0; index < options.length; index++) {
                            const option = options[index];
                            if (option.value === trainingDetails[selectId]) {
                                option.setAttribute("selected", "");
                                break;
                            }
                        }
                    }

                    // set select options in feedback section
                    else if (selectId.includes("coach")) {
                        let coachIndex = parseInt(selectId.replace("coach", "")) - 1;
                        let coach = trainingDetails.sessions[coachIndex].coach;
                        if (coach) {
                            let options = select.childNodes;
                            for (let index = 0; index < options.length; index++) {
                                const option = options[index];
                                if (option.value === coach) {
                                    option.setAttribute("selected", "");
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [props.location.pathname, props.match.params.id, isBusy.fetch, isBusy.sessionList]);

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

    useEffect(() => {
        if (!isBusy.fetch && props.location.pathname.includes("/Trainings/Edit/")) {
            let copy = cloneDeep(trainingDetails.sessions);
            setSessionList(copy);
            setIsBusy({ fetch: false, sessionList: false })
        }
    }, [isBusy.fetch, props.location.pathname]);

    const [members, setMembers] = useState([]);

    useEffect(() => {
        let replaceMems = [];
        membersList.forEach((mem) => {
            replaceMems.push({
                label: mem.name,
                value: mem.id
            })
        })

        setMembers(replaceMems);
    }, []);

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
        let attr = e.target.getAttribute("inputname");

        if (attr === "recurring") {
            replace[id]["isRecurring"] = e.target.checked;
            setSessionList(replace);
            return;
        }

        else if (attr.includes("Date") && value)
            value = new Date(value).toISOString();

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

    return isBusy.sessionList ? null : (
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
                            <input id="trainingTitle" name="trainingTitle" type="text" defaultValue={trainingDetails.name} />
                            <br />

                            {/* ---------- TRAINING TITLE ---------- */}
                            <label htmlFor="sports">Sports</label>
                            <br/>
                            <select id="sports" name="sports">
                                <option value="">Sports</option>
                                <option value="Archery">Archery</option>
                                <option value="Badminton">Badminton</option>
                                <option value="Basketball">Basketball</option>
                                <option value="Football">Football</option>
                                <option value="Table Tennis">Table Tennis</option>
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
                                defaultValue={trainingDetails.trainingDesc}
                            />
                            <br />

                            {/* ---------- DOCUMENTS ---------- */}
                            <label htmlFor="trainingImg">Training Image</label>
                            <br />
                            <input id="trainingImg" name="trainingImg" type="file" />
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("2")}>
                    {
                        isBusy.sessionList ? "Loading" : sessionList.map((session, index) => {
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
                                            inputname="location"
                                            onChange={handleSessionInputChange}
                                            value={session.location}
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
                                                    inputname="startDate"
                                                    onChange={handleSessionInputChange}
                                                    value={session.startDate ? ISOStringToDateInput(session.startDate) : ""}
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
                                                    inputname="endDate"
                                                    onChange={handleSessionInputChange}
                                                    value={session.endDate ? ISOStringToDateInput(session.endDate) : ""}
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
                                                    inputname="startTime"
                                                    onChange={handleSessionInputChange}
                                                    value={session.startTime}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={"endTime" + index} style={{ visibility: "hidden" }}>End Time</label>
                                                <input
                                                    type="time"
                                                    id={"endTime" + index}
                                                    name={"endTime" + index}
                                                    data-id={index}
                                                    inputname="endTime"
                                                    onChange={handleSessionInputChange}
                                                    value={session.endTime}
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
                                            inputname="recurring"
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
                        isBusy.sessionList ? "Loading..." : sessionList.map((session, index) => {
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
                                            options={members}
                                            dataId={index}
                                            add={handleAddAthlete}
                                            rm={handleRmAthlete}
                                            defaultOptions={session.athletes}
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
