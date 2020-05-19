import React, { useState, useEffect } from 'react';
import { ISOStringToDate, validationDic } from '../CommonFunctions';
import users from './data/Coaches.json';

const emptyUser = {
    name: "",
    nationality: "",
    dob: "",
    sports: "",
    address: "",
    mobileNo: "",
    emailAddr: "",
    cspName: ""
}

function AddCoach(props) {

    const [isProcessed, setIsProcessed] = useState(false);

    // Keep track of which section to display
    const [currentSection, setCurrentSection] = useState("tab1");

    const [coach, setCoach] = useState(emptyUser);

    useEffect(() => {
        if (props.location.pathname.includes("/Coaches/Edit/") && !isProcessed) {
            // fetch coach
            let coachesList = users;
            let aCoach;
            let id = parseInt(props.match.params.id);
            for (let i = 0; i < coachesList.length; i++) {
                const user = coachesList[i];
                if (user.id === id) {
                    aCoach = user;
                    break;
                }
            }
            let objKeys = Object.keys(aCoach);

            objKeys.forEach(key => {
                if(typeof(aCoach[key]) === "string" && aCoach[key].match(validationDic["isostring"])) {
                    let dateObj = ISOStringToDate(aCoach[key]);
                    let monthString = dateObj.getMonth().toString();
                    let dateString = dateObj.getDate().toString();

                    if (monthString.length === 1)
                        monthString = "0" + monthString

                    if (dateString.length === 1)
                        dateString = "0" + dateString

                    let defaultVal = dateObj.getFullYear() + 
                                     "-" + monthString + 
                                     "-" + dateString;

                    aCoach[key] = defaultVal
                }
            });

            // Since default value doesn't work for select options
            let selectInputs = document.getElementsByTagName("select");
            for (let i = 0; i < selectInputs.length; i++) {
                let select = selectInputs[i];
                let selectId = select.id;
                
                if (aCoach[selectId]) {
                    let options = select.childNodes;
                    for (let index = 0; index < options.length; index++) {
                        const option = options[index];
                        if (option.value === aCoach[selectId]) {
                            option.setAttribute("selected", "");
                            break;
                        }
                    }
                }
            }
            
            setCoach(aCoach);
            setIsProcessed(true);
        }
    }, [props.location.pathname, isProcessed, props.match.params.id])

    const inputUnfocus = (e) => {
        // onBlur
        console.log("On blur function was called for: ", e.target.id);
        let regEx = validationDic[e.target.getAttribute("regEx")]
        console.log("Reg Ex: " , regEx);
        if (e.target.value && regEx) {
            if (!e.target.value.match(regEx))
                e.target.setAttribute("style", "border-color:#ff3f34");
            else
                e.target.removeAttribute("style");
        }
    }


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
                <h1>{props.location.pathname.includes("Edit") ? "Edit Coach" : "Add Coach"}</h1>
                <div className="buttonsSet">
                    <button onClick={cancel} className="noselect">Cancel</button>
                    <button form="form" className="noselect" id="submit">Save</button>
                </div>
            </div>

            <div className="sections">
                <span onClick={changeSection} style={{ width: "40%" }} className={displayTab("1")} id="tab1">Personal Details</span>
                <span onClick={changeSection} style={{ width: "40%" }} className={displayTab("2")} id="tab2">Coaching Qualifications</span>
            </div>

            <form id="form" onSubmit={handleSubmit}>
                <div style={displaySection("1")}>
                    <div id="personalDetails">
                        <h3>Particulars</h3>
                        <div className="inputs">
                            {/* ---------- NAME ---------- */}
                            <label htmlFor="name">Name</label>
                            <br />
                            <input id="name" name="name" type="text" regEx="alphaspace" defaultValue={coach.name} onBlur={inputUnfocus} />
                            <br />

                            {/* NATIONALITY */}
                            <label htmlFor="nationality">Nationality</label>
                            <br />
                            <input id="nationality" name="nationality" type="text" regEx="alphaspace" defaultValue={coach.nationality} onBlur={inputUnfocus} />
                            <br />

                            {/* ---------- DOB ---------- */}
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob" name="dob" defaultValue={coach.dob} />
                            <br />

                            {/* ---------- SPORTS ---------- */}
                            <label htmlFor="sports">Sports</label>
                            <br />
                            <input id="sports" name="sports" type="text" defaultValue={coach.sports} />
                            <br />

                            {/* ---------- NROC MEMBERSHIP ---------- */}
                            {/* TO DO: haven't done nroc for coach details as well */}
                            <input type="checkbox" id="nroc" name="nroc" defaultValue="hasNROC" />
                            <label htmlFor="nroc">Coach has NROC Membership</label><br />
                        </div>
                    </div>

                    <br />

                    <div id="contactInfo">
                        <h3>Contact Information</h3>

                        <div className="inputs">
                            {/* ---------- ADDRESS ---------- */}
                            <label htmlFor="address">Address</label>
                            <br />
                            <textarea name="address" id="address" rows="5" defaultValue={coach.address} />
                            <br />

                            {/* ---------- CONTACT NUMBER ---------- */}
                            <label htmlFor="mobileNo">Mobile Number</label>
                            <br />
                            <input id="mobileNo" name="mobileNo" type="text" defaultValue={coach.mobileNo} />
                            <br />

                            {/* ---------- EMAIL ADDRESS ---------- */}
                            <label htmlFor="emailAddr">Email Address</label>
                            <br />
                            <input id="emailAddr" name="emailAddr" type="text" defaultValue={coach.emailAddr} />
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
                            <input id="resumeCv" name="resumeCv" type="file" multiple />

                            {/* ---------- COACHING QUALIFICATIONS ---------- */}
                            <label htmlFor="coachQual">Coaching Qualifications</label>
                            <input id="coachQual" name="coachQual" type="file"multiple />
                        </div>
                    </div>

                    <div id="dailyaid">
                        <h3>Daily Aid Details</h3>
                        <div className="inputs">
                            {/* ---------- COACHING SERVICE PROVIDER NAME ---------- */}
                            <label htmlFor="cspName">Coaching Service Provider Name</label>
                            <br />
                            <input id="cspName" name="cspName" type="text" defaultValue={coach.cspName} />
                            <br />

                            {/* ---------- COACHING SERVICE PROVIDER CONTRACT ---------- */}
                            <label htmlFor="cspContract">Coaching Service Provider Contract</label>
                            <br />
                            <input id="cspContract" name="cspContract" type="file" multiple />
                            <br />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddCoach;
