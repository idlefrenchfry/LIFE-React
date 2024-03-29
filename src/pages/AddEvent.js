import React, { useState, useEffect } from 'react';
import MultiSelect from '../components/MultiSelect';
import { formatAMPM, getDayName, getMonthName, ISOStringToDateInput } from '../CommonFunctions';
import eventsList from './data/Events.json';
import { cloneDeep } from 'lodash'; // To deep clone arrays with objects

const sectionInputs = [
    {
        label: "Age",
        value: "age"
    },
    {
        label: "Address",
        value: "address"
    },
    {
        label: "Contact Number",
        value: "contactNo"
    },
    {
        label: "Diagnosis",
        value: "diagnosis"
    },
    {
        label: "Input",
        value: "input"
    }
]

const emptyEvent = {
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    name: "",
    publishStatus: "",
    description: "",
    paxLim: "",
    restrDetails: "",
    formTitle: "",
    messageDesc: "",
    registrationSections: [],
    feedbackSections: []
}

function AddEvents(props) {
    
    // If edit page, wait for event to fetch before rendering
    const [isBusy, setIsBusy] = useState(props.location.pathname.includes("/Events/Edit/") ? true : false);

    // Keep track of which section to display
    const [currentSection, setCurrentSection] = useState("tab1");

    const [eventDetails, setEventDetails] = useState(emptyEvent);

    useEffect(() => {
        // TO DO: fetch event
        if (props.location.pathname.includes("/Events/Edit/")) {
            
            if (isBusy) {
                let events = eventsList;
                let filterEvent = events.filter((event) => event.id === parseInt(props.match.params.id));
                if (filterEvent.length === 1) {
                    setEventDetails(filterEvent[0])
                    // setEventsFetchState("fetched");
                    setIsBusy(false);
                }

                // else
                    // setEventsFetchState("failed");
            }

            else {
                // Since default value doesn't work for select options
                let selectInputs = document.getElementsByTagName("select");
                for (let i = 0; i < selectInputs.length; i++) {
                    let select = selectInputs[i];
                    let selectId = select.id;
                    if (eventDetails[selectId]) {
                        let options = select.childNodes;
                        for (let index = 0; index < options.length; index++) {
                            const option = options[index];
                            if (option.value === eventDetails[selectId]) {
                                option.setAttribute("selected", "");
                                break;
                            }
                        }
                    }

                    // set select options in feedback section
                    else if (selectId.includes("qnType")) {
                        let qnIndex = parseInt(selectId.replace("qnType", "")) - 1;
                        let qnType = eventDetails.feedbackSections[qnIndex].qnType;
                        if (qnType) {
                            let options = select.childNodes;
                            for (let index = 0; index < options.length; index++) {
                                const option = options[index];
                                if (option.value === qnType) {
                                    option.setAttribute("selected", "");
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [props.location.pathname, props.match.params.id, isBusy])

    // Dynamic event info inputs
    const [eventInfoSections, setEventInfoSections] = useState([{
        sectionTitle: "",
        inputs: []
    }])

    useEffect(() => {
        if(props.location.pathname.includes("/Events/Edit/") && eventDetails.registrationSections.length > 0) {
            setEventInfoSections(eventDetails.registrationSections);
        }
    }, [props.location.pathname, eventDetails.registrationSections])

    const [eventInfoInputs, setEventInfoInputs] = useState(sectionInputs);

    useEffect(() => {
        if(props.location.pathname.includes("/Events/Edit/") && eventDetails.registrationSections.length > 0) {
            let replaceEventInfoInputs = cloneDeep(eventInfoInputs);

            // loop through each section to check for selected inputs
            eventDetails.registrationSections.forEach((section) => {
                if (section.inputs.length > 0) {
                    for (let i = 0; i < section.inputs.length; i++) {
                        const selected = section.inputs[i];
                        // loop through list of unselected inputs and compare
                        for (let x = replaceEventInfoInputs.length; x > 0; x--) {
                            const input = replaceEventInfoInputs.pop();
                            // if not the selected input, add back to unselected
                            if (input.label !== selected.label)
                                replaceEventInfoInputs.unshift(input);
                        }
                    }
                }

                setEventInfoInputs(replaceEventInfoInputs);
            })
        }
    }, [props.location.pathname, eventDetails.registrationSections])

    // Dynamic feedback info inputs
    const [feedbackInfoSections, setFeedbackInfoSections] = useState([{
        question: "",
        qnType: ""
    }])

    useEffect(() => {
        if(props.location.pathname.includes("/Events/Edit/") && eventDetails.feedbackSections.length > 0) {
            setFeedbackInfoSections(eventDetails.feedbackSections);
        }
    }, [props.location.pathname, eventDetails.feedbackSections.length])


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

    // TO DO:
    // const handleEventInfoChange = (e) => {
    //     let inputType = e.target.id;
    //     if (inputType.substr("sectionTitle") !== -1) {
    //         let index = parseInt(e.target.id.replace("sectionTitle", "")) - 1;
    //         let replace = cloneDeep(eventInfoSections);
    //         replace[index].title = e.target.value;
    //         setEventInfoSections(replace);
    //     }
    // }

    const handleAddRegistrationInput = (option, id="") => {
        id = parseInt(id);

        if (isNaN(id))
            console.error("id cannot be empty!")
        else {
            // Find option in eventInfoInputs and remove
            let replaceInputs = cloneDeep(eventInfoInputs)
            for (let i = 0; i < replaceInputs.length; i++) {
                if (replaceInputs[i].value === option.value) {
                    replaceInputs.splice(i, 1);
                    console.log("Option popped!")
                    break;
                }
            }

            // Add option to eventInfoSections
            let replaceSections = cloneDeep(eventInfoSections);
            replaceSections[id].inputs.push(option);

            // set states
            setEventInfoInputs(replaceInputs);
            setEventInfoSections(replaceSections);
        }
    }

    const handleRmRegistrationInput = (option, id = "") => {
        id = parseInt(id);

        if (isNaN(id))
            console.error("id cannot be empty!")
        else {
            // Add input back to eventInfoInputs
            let replaceInputs = cloneDeep(eventInfoInputs)
            replaceInputs.push(option);

            // Remove option from eventInfoSections
            let replaceSections = cloneDeep(eventInfoSections);
            for (let i = 0; i < replaceSections[id].inputs.length; i++) {
                if (replaceSections[id].inputs[i].value === option.value) {
                    replaceSections[id].inputs.splice(i, 1);
                    console.log("Option popped!")
                    break;
                }
            }

            // set states
            setEventInfoInputs(replaceInputs);
            setEventInfoSections(replaceSections);
        }
    }

    const handleAddSections = () => {
        let replace = cloneDeep(eventInfoSections);
        replace.push({
            title: "",
            inputs: []
        });

        setEventInfoSections(replace);
    }

    // TO DO
    // const handleRemoveSection = () => {
    // }


    const handleAddQnSections = () => {
        let replace = cloneDeep(feedbackInfoSections);
        replace.push({
            question: "",
            qnType: ""
        });

        setFeedbackInfoSections(replace);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(e.target.elements);
        // window.location.href = "/Members";
    };

    const cancel = () => window.location.href = "/Events";

    let startDate;
    if (props.location.pathname.includes("/Events/Edit/"))
        startDate = new Date(eventDetails.startDate);
    
    return isBusy ? null : (
        <div className="card">
            <div className="cardTop">
                <h1>{props.location.pathname.includes("/Events/Edit/") ? "Edit Event" : "Add Event"}</h1>
                <div className="buttonsSet">
                    <button onClick={cancel} className="noselect">Cancel</button>
                    <button form="form" className="noselect" id="submit">Save As Draft</button>
                    <button form="form" className="noselect" id="submit">Save</button>
                </div>
            </div>

            {
                (props.location.pathname.includes("/Events/Edit/") ? 
                    <div className="eventDetails">
                        <img alt="event thumbnail" src="https://i.ytimg.com/vi/XplrxSSrja0/maxresdefault.jpg" />
                        <div>
                            <span className="eventDate">{getDayName(startDate.getDay())}, {startDate.getDate()} {getMonthName(startDate.getMonth())} {startDate.getFullYear()} </span> {/* MON, 6 Mar 2020 */}
                            <span className="eventTime">{formatAMPM(eventDetails.startTime)} - {formatAMPM(eventDetails.endTime)}</span>
                            <br />
                            <span className="eventLocation">{eventDetails.name}</span>
                            <br />
                            <span className="eventMemb">{eventDetails.memGoing.length} Members Going</span>
                            <br />
                            <span className="eventStatus">{eventDetails.publishStatus ? "Published" : "Unpublished"}</span>
                        </div>
                    </div> :
                    null
                )
            }


            <div className="sections">
                <span onClick={changeSection} className={displayTab("1")} id="tab1">Event Details</span>
                <span onClick={changeSection} className={displayTab("2")} id="tab2">Event Information Form</span>
                <span onClick={changeSection} className={displayTab("3")} id="tab3">Feedback Form</span>
            </div>

            <form id="form" onSubmit={handleSubmit}>
                <div style={displaySection("1")}>
                    <div id="basicInfo">
                        <h3>Basic Information</h3>
                        <div className="inputs">
                            {/* ---------- EVENT TITLE ---------- */}
                            <label htmlFor="eventTitle">Event Title</label>
                            <br />
                            <input id="eventTitle" name="eventTitle" type="text" defaultValue={eventDetails.name} />
                            <br />

                            {/* ---------- LOCATION ---------- */}
                            <label htmlFor="location">Location</label>
                            <br />
                            <input id="location" name="location" type="text" defaultValue={eventDetails.location} />
                            <br />

                            {/* ---------- SPORTS CATEGORY ---------- */}
                            <label htmlFor="sports">Sports Category</label>
                            <br />
                            <select id="sports" name="sports">
                                <option value="">Select Sports</option>
                                <option value="Archery">Archery</option>
                                <option value="Badminton">Badminton</option>
                                <option value="Basketball">Basketball</option>
                                <option value="Football">Football</option>
                                <option value="Table Tennis">Table Tennis</option>
                            </select>
                            <br />

                            <div className="split">
                                <div>
                                    {/* ---------- STARTS ---------- */}
                                    <label htmlFor="startDate">Starts</label>
                                    <br />
                                    <input type="date" id="startDate" name="startDate" defaultValue={eventDetails.startDate ? ISOStringToDateInput(eventDetails.startDate) : ""} />
                                    <br />
                                </div>

                                <div>
                                    {/* ---------- END ---------- */}
                                    <label htmlFor="endDate">Ends</label>
                                    <br />
                                    <input type="date" id="endDate" name="endDate" defaultValue={eventDetails.endDate ? ISOStringToDateInput(eventDetails.endDate) : ""} />
                                </div>
                            </div>
                            <br />

                            <div className="split">
                                {/* ---------- TIME ---------- */}
                                <div>
                                    <label htmlFor="startTime">Time</label>
                                    <br />
                                    <input type="time" id="startTime" name="startTime" defaultValue={eventDetails.startTime} />
                                </div>
                                <div>
                                    <label htmlFor="endTime" style={{ visibility: "hidden" }}>End Time</label>
                                    <input type="time" id="endTime" name="endTime" defaultValue={eventDetails.endTime} />
                                </div>
                            </div>
                            <br />

                            {/* ---------- RECURRING ---------- */}
                            <label htmlFor="recurring">Is this a recurring event?</label>
                            <input type="checkbox" id="recurring" name="recurring" value="isRecurring" />
                            <br />

                            {/* ---------- EVENT DESCRIPTION ---------- */}
                            <label htmlFor="eventDesc">Event Description</label>
                            <br />
                            <textarea placeholder="Type in event description" name="eventDesc" id="eventDesc" rows="5" defaultValue={eventDetails.description} />
                            <br />

                            {/* ---------- EVENT IMAGE ---------- */}
                            <label htmlFor="eventImg">Event Image</label>
                            <br />
                            <input id="eventImg" name="eventImg" type="file" />
                            <br />
                        </div>
                    </div>

                    <br />

                    <div id="conditions">
                        <h3>Conditions</h3>
                        <div className="inputs">
                            {/* ---------- LOCATION ---------- */}
                            <label htmlFor="paxLim">Max Number of Pax</label>
                            <br />
                            <input id="paxLim" name="paxLim" type="text" defaultValue={eventDetails.paxLim} />
                            <br />

                            {/* ---------- EVENT DESCRIPTION ---------- */}
                            <label htmlFor="restrDetails">Restrictions/Disclaimer Details</label>
                            <br />
                            <textarea name="restrDetails" id="restrDetails" rows="5" defaultValue={eventDetails.restrDetails} />
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("2")}>
                    <div id="registrationForm">
                        <h3>Welcome</h3>
                        <div className="inputs">
                            {/* ---------- EVENT REGISTRATION FORM TITLE ---------- */}
                            <label htmlFor="formTitle">Event Registration Form Title</label>
                            <br />
                            <input id="formTitle" name="formTitle" type="text" defaultValue={eventDetails.formTitle} />
                            <br />

                            {/* ---------- MESSAGE DESCRIPTION ---------- */}
                            <label htmlFor="messageDesc">Message Description</label>
                            <br />
                            <span className="formHelper">Participants will see this message when they first arrive to the form</span>
                            <br />
                            <textarea id="messageDesc" name="messageDesc" rows="5" placeholder="Type in description" defaultValue={eventDetails.messageDesc} />
                            <br />
                        </div>
                    </div>

                    {
                        eventInfoSections.map((sec, index) => {
                            return (
                                <div key={index}>
                                    <h3>Section {index + 1}</h3>
                                    <div className="inputs">
                                        {/* ---------- SECTION TITLE ---------- */}
                                        <label htmlFor={"sectionTitle" + (index + 1)}>Section Title</label>
                                        <br />
                                        <input
                                            id={"sectionTitle" + (index + 1)}
                                            name={"sectionTitle" + (index + 1)}
                                            type="text"
                                            defaultValue={sec.sectionTitle}
                                        />
                                        <br />

                                        {/* ---------- SECTION INPUTS ---------- */}
                                        <label htmlFor={"sectionInput" + (index + 1)}>Inputs</label>
                                        {index !== 0 ? <span className="formHelper"><br/>Select fields you would like participants to input (max. 4)</span> : ""}
                                        <br />
                                        <MultiSelect
                                            key={index}
                                            options={eventInfoInputs}
                                            dataId={index}
                                            add={handleAddRegistrationInput}
                                            rm={handleRmRegistrationInput}
                                            defaultOptions={sec.inputs}
                                            sync={true}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    }

                    <input className="upperButton" type="button" value="+ Add Section" onClick={handleAddSections} />
                </div>

                <div style={displaySection("3")}>
                    <div id="feedbackForm">
                        <h3>Welcome</h3>
                        <div className="inputs">
                            {/* ---------- EVENT REGISTRATION FORM TITLE ---------- */}
                            <label htmlFor="feedbackTitle">Feedback Form Title</label>
                            <br />
                            <input id="feedbackTitle" name="feedbackTitle" type="text" defaultValue={eventDetails.feedbackTitle} />
                            <br />

                            {/* ---------- MESSAGE DESCRIPTION ---------- */}
                            <label htmlFor="feedbackFormDesc">Message Description</label>
                            <br />
                            <span className="formHelper">Participants will see this message when they first arrive to the form</span>
                            <br />
                            <textarea id="feedbackFormDesc" name="feedbackFormDesc" rows="5" placeholder="Type in description" defaultValue={eventDetails.feedbackFormDesc} />
                            <br />

                            {/* ---------- SELECT OPTIONS ---------- */}
                            <span className="example"></span>
                        </div>
                    </div>

                    {
                        feedbackInfoSections.map((qnSec, index) => {
                            return (
                                <div key={index}>
                                    <h3>Question {index + 1}</h3>
                                    <div className="inputs">
                                        {/* ---------- QUESTION ---------- */}
                                        <label htmlFor={"question" + (index + 1)}>Question</label>
                                        <br />
                                        {/*onChange={handleEventInfoChange}*/}
                                        <textarea
                                            id={"question" + (index + 1)}
                                            name={"question" + (index + 1)}
                                            type="text"
                                            rows="5"
                                            placeholder="Type in description"
                                            defaultValue={qnSec.question}
                                        />
                                        <br />

                                        {/* ---------- QUESTION TYPES ---------- */}
                                        <label style={{ "display": "none" }} htmlFor={"qnType" + (index + 1)}>Inputs</label>
                                        <select id={"qnType" + (index + 1)} name="gender" defaultValue={qnSec.qnType}>
                                            <option value="">Question Type</option>
                                            <option value="single">Single line text</option>
                                            <option value="paragraph">Paragraph</option>
                                            <option value="multiChoice">Multiple choice</option>
                                            <option value="checkbox">Checkbox select</option>
                                            <option value="dropdown">Dropdown select</option>
                                            <option value="likert">Likert scale</option>
                                        </select>
                                    </div>
                                </div>
                            );
                        })
                    }

                    <input className="upperButton" onClick={handleAddQnSections} value="+ Add Question" type="button" />
                </div>
            </form>
        </div>
    );
}

export default AddEvents;
