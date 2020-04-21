import React, { useState } from 'react';

function CoachDetails(props) {

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
            return { display: "flex" };
    }

    // Change style of tab depending on current section
    const displayTab = (id) => {
        if (currentSection.slice(-1) === id)
            return "currentTab noselect";
        else
            return "noselect";
    }

    const editDetails = () => window.location.href = "/Coaches";

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
                        <Details label="Name" value="Park Soo Young" />
                        <Details label="Nationality" value="Korean" />
                        <Details label="Date of Birth" value="23/09/1996" />
                        <Details label="Sports" value="Archery" />
                    </div>
                    <div>
                        <h3>Contact Information</h3>
                        <Details label="Address" value="13-09 ngee ann city tower b 391b orchard road, 238874, Singapore" />
                        <Details label="Mobile Number" value="+65 8273 0192" />
                        <Details label="Email Address" value="parksooyoung@email.com" />
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

function Details(props) {
    return (
        <div className="detailsInfo">
            <span>{props.label}</span>
            <span>{props.value}</span>
        </div>
    );
}

function DetailsFile(props) {
    return (
        <div className="detailsInfo fileDownload">
            <span>{props.label}</span>
            {
                props.value.map((value, index) => {
                    return <a key={index} href={props.path[index]} download="">{value}</a>
                })
            }
        </div>
    );
}

export default CoachDetails;
