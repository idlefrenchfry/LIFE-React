import React, { useState, useEffect } from 'react';
import { ISOStringToDate } from '../CommonFunctions';
import { Details, DetailsFile } from '../components/ViewDetails';
import users from './data/Coaches.json';
import { cloneDeep } from 'lodash';

const user = {
    name: "Park Soo Young",
    nationality: "Korean",
    dob: "1996-10-23T07:35:13.451Z",
    sports: "Archery",
    address: "13-09 ngee ann city tower b 391b orchard road, 238874, Singapore",
    mobileNo: "+65 8273 0192",
    emailAddr: "parksooyoung@email.com",
    cspName: "Aspire Badminton Centre"
}

const isoRegExp = new RegExp("^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$");

function CoachDetails(props) {

    // Keep track of which section to display
    const [currentSection, setCurrentSection] = useState("tab1");
    const [coach, setCoach] = useState({});

    useEffect(() => {
        // Fetch coaches
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

        let keys = Object.keys(aCoach);
        let changed = false;

        for (let i = 0; i < keys.length; i++) {
            const property = keys[i];
            if (!aCoach[property]) {
                aCoach[property] = "-";
                changed = true;
            } else if (aCoach[property].constructor.name === "String") {
                // If ISO String, convert to dd/mm/yyyy
                let match = aCoach[property].match(isoRegExp);
                if (match) {
                    let dateObj = ISOStringToDate(match[0]);
                    console.log("dateObj: ", dateObj);
                    aCoach[property] = dateObj.getDate() + "/" + 
                                            dateObj.getMonth() + "/" + 
                                            dateObj.getFullYear();
                    changed = true;
                }
            }
        }

        if (changed)
            setCoach(aCoach);
    }, [coach])

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
            return { display: "flex" };
    }

    // Change style of tab depending on current section
    const displayTab = (id) => {
        if (currentSection.slice(-1) === id)
            return "currentTab noselect";
        else
            return "noselect";
    }

    const editDetails = () => window.location.href = "/Coaches/Edit/" + props.match.params.id;

    console.log("id:", props.match.params.id);

    return (
        <div className="card">
            <div className="cardTop">
                <h1>View Coach</h1>
                <div className="buttonsSet">
                    <button onClick={editDetails} className="noselect">Edit Details</button>
                </div>
            </div>

            <div className="sections">
                <span onClick={changeSection} style={{ width: "40%" }} className={displayTab("1")} id="tab1">Personal Details</span>
                <span onClick={changeSection} style={{ width: "40%" }} className={displayTab("2")} id="tab2">Coaching Qualifications</span>
            </div>

            <div>
                <div className="detailsSection" style={displaySection("1")}>
                    <div>
                        <h3>Particulars</h3>
                        <Details label="Name" value={coach.name} />
                        <Details label="Nationality" value={coach.nationality} />
                        <Details label="Date of Birth" value={coach.dob} />
                        <Details label="Sports" value={coach.sports} />
                    </div>
                    <div>
                        <h3>Contact Information</h3>
                        <Details label="Address" value={coach.address} />
                        <Details label="Mobile Number" value={coach.mobileNo} />
                        <Details label="Email Address" value={coach.emailAddr} />
                    </div>
                </div>

                <div className="detailsSection" style={displaySection("2")}>
                    <div>
                        <h3>Documents</h3>
                        <DetailsFile label="Resume/CV" path={[""]} value={["Resume.png"]} />
                        <DetailsFile label="Coaching Qualifications" path={["", ""]} value={["Cert1.jpg", "Cert2.jpg"]} />
                    </div>
                    <div>
                        <h3>Coaching Service Provider</h3>
                        <Details label="Coaching Service Provider Name" value="Aspire Badminton Centre" />
                        <DetailsFile label="Coaching Service Provider Contract" path={[""]} value={["AspireBadmintonCentre.pdf"]} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoachDetails;
