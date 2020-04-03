import React, { useEffect, useState } from 'react';

function AddCoach() {

    const today = new Date();

    // Keep track of which section to display
    const [currentSection, setCurrentSection] = useState("tab1");

    // onClick function to execute when changing section
    const changeSection = (e) => {
        if (e.target.id !== currentSection)
            setCurrentSection(e.target.id);
    }

    // Return different styles depending on current section
    const displaySection = (id) => {
        if (currentSection.slice(-1) !== id)
            return { display: "none" };
        else
            return { display: "block" };
    }

    // Change style of tab depending on current section
    const displayTab = (id) => {
        if (currentSection.slice(-1) === id)
            return "currentTab noselect";
        else
            return "noselect";
    }

    // const submitForm = () => document.getElementById('form').submit();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(e.target.elements);
        // window.location.href = "/Members";
    }

    const cancel = () => window.location.href = "/Coaches";

    return (
        <div className="card">
            <div className="cardTop">
                <h1>Add Coach</h1>
                <div className="buttonsSet">
                    <button onClick={cancel} className="noselect">Cancel</button>
                    <button form="form" className="noselect" id="submit">Save</button>
                </div>
            </div>

            <div className="sections">
                <span onClick={changeSection} style={{ width: "40%" }} className={displayTab("1")} id="tab1">Personal Details</span>
                <span onClick={changeSection} style={{ width: "40%"}} className={displayTab("2")} id="tab2">Coaching Qualifications</span>
            </div>

            <form id="form" onSubmit={handleSubmit}>
                <div style={displaySection("1")}>
                    <div id="personalDetails">
                        <h3>Particulars</h3>
                        <div className="inputs">
                            {/* ---------- NAME ---------- */}
                            <label htmlFor="eName">Name</label>
                            <br />
                            <input id="eName" name="eName" type="text"></input>
                            <br />

                            {/* NATIONALITY */}
                            <label htmlFor="nationality">Nationality</label>
                            <br />
                            <input id="nationality" name="nationality" type="text"></input>
                            <br />

                            {/* ---------- DOB ---------- */}
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob" name="dob"
                                max={today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate()}></input>
                            <br />

                            {/* ---------- SPORTS ---------- */}
                            <label htmlFor="sports">Sports</label>
                            <br />
                            <input id="sports" name="sports" type="text" />
                            <br />

                            {/* ---------- NROC MEMBERSHIP ---------- */}
                            <input type="checkbox" id="nroc" name="nroc" value="hasNROC" required />
                            <label for="nroc">Coach has NROC Membership</label><br />
                        </div>
                    </div>

                    <br />

                    <div id="contactInfo">
                        <h3>Contact Information</h3>

                        <div className="inputs">
                            {/* ---------- ADDRESS ---------- */}
                            <label htmlFor="addr">Address</label>
                            <br />
                            <textarea name="addr" id="addr" rows="5"/>
                            <br />

                            {/* ---------- CONTACT NUMBER ---------- */}
                            <label htmlFor="contactNum">Mobile Number</label>
                            <br />
                            <input id="contactNum" name="contactNum" type="text"></input>
                            <br />

                            {/* ---------- EMAIL ADDRESS ---------- */}
                            <label htmlFor="emailAddr">Email Address</label>
                            <br />
                            <input id="emailAddr" name="emailAddr" type="text"></input>
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("2")}>
                    <div id="coachingQualifications">
                        <h3>Coaching Qualifications</h3>
                        <div className="inputs">
                            {/* ---------- DOCUMENTS ---------- */}
                            <label htmlFor="resumeCv">Resume / CV</label>
                            <input id="resumeCv" name="resumeCv" type="file"></input>
                            {/* ---------- COACHING QUALIFICATIONS ---------- */}
                            <label htmlFor="coachQual">Coaching Qualifications</label>
                            <input id="coachQual" name="coachQual" type="file"></input>
                        </div>
                    </div>

                    <div id="dailyaid">
                        <h3>Daily Aid Details</h3>
                        <div className="inputs">
                            {/* ---------- COACHING SERVICE PROVIDER NAME ---------- */}
                            <label htmlFor="cspName">Coaching Service Provider Name</label>
                            <br />
                            <input id="cspName" name="cspName" type="text"></input>
                            <br />

                            {/* ---------- COACHING SERVICE PROVIDER CONTRACT ---------- */}
                            <label htmlFor="cspContract">Coaching Service Provider Contract</label>
                            <br />
                            <input id="cspContract" name="cspContract" type="file"></input>
                            <br />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddCoach;
