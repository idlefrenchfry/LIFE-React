import React, { useState } from 'react';
import { cloneDeep } from 'lodash'; // To deep clone arrays with objects
import MultiSelect from '../components/MultiSelect';

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

function AddEvents() {
    // Keep track of which section to display
    const [currentSection, setCurrentSection] = useState("tab1");

    // Dynamic event info inputs
    const [eventInfoSections, setEventInfoSections] = useState([{
        title: "",
        inputs: []
    }])

    const [eventInfoInputs, setEventInfoInputs] = useState(sectionInputs);

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

    // only needed if can remove sections
    const handleEventInfoChange = (e) => {
        let inputType = e.target.id;
        if (inputType.substr("sectionTitle") !== -1) {
            let index = parseInt(e.target.id.replace("sectionTitle", "")) - 1;
            let replace = cloneDeep(eventInfoSections);
            replace[index].title = e.target.value;
            setEventInfoSections(replace);
        }
    }

    const handleEventInputChange = (e) => {
        // To Do
        // Somehow sync multiple select options
        // 1) Make select option an entirely separate component?
        // 2) Find a decent project
    }

    const handleAddSections = () => {
        let replace = cloneDeep(eventInfoSections);
        replace.push({
            title: "",
            inputs: []
        });

        setEventInfoSections(replace);
    }

    const handleRemoveSection = () => {
        // To Do
        // Remove Sections.
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(e.target.elements);
        // window.location.href = "/Members";
    };

    const cancel = () => window.location.href = "/Events";

    return (
        <div className="card">
            <div className="cardTop">
                <h1>Add Events</h1>
                <div className="buttonsSet">
                    <button onClick={cancel} className="noselect">Cancel</button>
                    <button form="form" className="noselect" id="submit">Save As Draft</button>
                    <button form="form" className="noselect" id="submit">Save</button>
                </div>
            </div>

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
                            <input id="eventTitle" name="eventTitle" type="text"></input>
                            <br />

                            {/* ---------- LOCATION ---------- */}
                            <label htmlFor="location">Location</label>
                            <br />
                            <input id="location" name="location" type="text"></input>
                            <br />

                            {/* ---------- SPORTS CATEGORY ---------- */}
                            <label htmlFor="sports">Sports Category</label>
                            <br />
                            <select id="sports" name="sports">
                                <option value="">Sports</option>
                                <option value="archery">Archery</option>
                                <option value="badminton">Badminton</option>
                                <option value="basketball">Basketball</option>
                                <option value="football">Football</option>
                                <option value="table tennis">Table Tennis</option>
                            </select>
                            <br />

                            <div className="split">
                                <div>
                                    {/* ---------- STARTS ---------- */}
                                    <label htmlFor="startDate">Starts</label>
                                    <br />
                                    <input type="date" id="startDate" name="startDate"></input>
                                    <br />
                                </div>

                                <div>
                                    {/* ---------- END ---------- */}
                                    <label htmlFor="endDate">Ends</label>
                                    <br />
                                    <input type="date" id="endDate" name="endDate"></input>
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

                            {/* ---------- RECURRING ---------- */}
                            <label htmlFor="recurring">Is this a recurring event?</label>
                            <input type="checkbox" id="recurring" name="recurring" value="isRecurring" />
                            <br />

                            {/* ---------- EVENT DESCRIPTION ---------- */}
                            <label htmlFor="eventDesc">Event Description</label>
                            <br />
                            <textarea placeholder="Type in event description" name="eventDesc" id="eventDesc" rows="5" />
                            <br />

                            {/* ---------- EVENT IMAGE ---------- */}
                            <label htmlFor="eventImg">Event Image</label>
                            <br />
                            <input id="eventImg" name="eventImg" type="file"></input>
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
                            <input id="paxLim" name="paxLim" type="text"></input>
                            <br />

                            {/* ---------- EVENT DESCRIPTION ---------- */}
                            <label htmlFor="restrDetails">Restrictions/Disclaimer Details</label>
                            <br />
                            <textarea name="restrDetails" id="restrDetails" rows="5" />
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
                            <input id="formTitle" name="formTitle" type="text"></input>
                            <br />

                            {/* ---------- MESSAGE DESCRIPTION ---------- */}
                            <label htmlFor="messageDesc">Message Description</label>
                            <br />
                            <span className="formHelper">Participants will see this message when they first arrive to the form</span>
                            <br />
                            <textarea id="messageDesc" name="messageDesc" rows="5" placeholder="Type in description"></textarea>
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
                                        {/*onChange={handleEventInfoChange}*/}
                                        <input
                                            id={"sectionTitle" + (index + 1)}
                                            name={"sectionTitle" + (index + 1)}
                                            type="text"
                                        />
                                        <br />

                                        {/* ---------- SECTION INPUTS ---------- */}
                                        <label htmlFor={"sectionInput" + (index + 1)}>Inputs</label>
                                        {index !== 0 ? <span className="formHelper"><br/>Select fields you would like participants to input (max. 4)</span> : ""}
                                        <br />
                                        <MultiSelect
                                            options={eventInfoInputs}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    }

                    <button onClick={handleAddSections}>Add Section</button>
                </div>

                <div style={displaySection("3")}>
                    <div id="feedbackForm">
                        <h3>Welcome</h3>
                        <div className="inputs">
                            {/* ---------- EVENT REGISTRATION FORM TITLE ---------- */}
                            <label htmlFor="feedbackTitle">Feedback Form Title</label>
                            <br />
                            <input id="feedbackTitle" name="feedbackTitle" type="text"></input>
                            <br />

                            {/* ---------- MESSAGE DESCRIPTION ---------- */}
                            <label htmlFor="feedbackFormDesc">Message Description</label>
                            <br />
                            <span className="formHelper">Participants will see this message when they first arrive to the form</span>
                            <br />
                            <textarea id="feedbackFormDesc" name="feedbackFormDesc" rows="5" placeholder="Type in description"></textarea>
                            <br />

                            {/* ---------- SELECT OPTIONS ---------- */}
                            <span className="example"></span>
                        </div>
                    </div>

                    <div>
                        <h3>Question 1</h3>
                        <div className="inputs">
                            To be implemented....
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddEvents;
