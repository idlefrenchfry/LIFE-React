import React, { useState } from 'react';

function MemberDetails(props) {

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

    const editDetails = () => window.location.href = "/Members";

    console.log("id:", props.match.params.id);

    return (
        <div className="card">
            <div className="cardTop">
                <h1>View Member</h1>
                <div className="buttonsSet">
                    <button onClick={editDetails} className="noselect">Edit Details</button>
                </div>
            </div>

            <div className="sections">
                <span onClick={changeSection} className={displayTab("1")} id="tab1">Personal Details</span>
                <span onClick={changeSection} className={displayTab("2")} id="tab2">Medical Information</span>
                <span onClick={changeSection} className={displayTab("3")} id="tab3">Next of Kin</span>
                <span onClick={changeSection} className={displayTab("4")} id="tab4">Career Details</span>
                <span onClick={changeSection} className={displayTab("5")} id="tab5">Sports Details</span>
            </div>

            <div>
                <div className="detailsSection" style={displaySection("1")}>
                    <div>
                        <h3>Particulars</h3>
                        <Details label="Name" value="Xiu Ying" />
                        <Details label="Chinese Name" value="秀英" />
                        <Details label="Gender" value="Female" />
                        <Details label="Date of Birth" value="12/03/1978" />
                        <Details label="Place of Birth" value="Singapore" />
                        <Details label="Nationality" value="Singapore" />
                        <Details label="Marital Status" value="Single" />
                        <Details label="Sports" value="Archery" />
                        <Details label="Role" value="Athlete" />
                    </div>
                    <div>
                        <h3>Contact Information</h3>
                        <Details label="Postal Code" value="728383" />
                        <Details label="Home Telephone Number" value="+65 6562 2837" />
                        <Details label="Mobile Number" value="+65 9283 7170" />
                        <Details label="Email Address" value="xiuying@email.com" />
                    </div>
                </div>

                <div className="detailsSection" style={displaySection("2")}>
                    <div>
                        <h3>Condition</h3>
                        <Details label="Disability/Medical Condition" value="Paraplegia" />
                        <Details label="Nature of Disability" value="Others" />
                    </div>
                    <div>
                        <h3>Daily Aid Details</h3>
                        <Details label="Daily Aids (If Applicable)" value="Wheelchair" />
                        <Details label="Estimated weight of Wheelchair (kg)" value="7" />
                        <Details label="Dimensions of Wheelchair" value="1.1m by 0.6m by 1.1m" />
                        <Details label="Type of Wheelchair" value="All-Terrain Wheelchair" />
                        <Details label="Wheel Diameter" value="45,7 cm" />
                        <Details label="Food/Drug Allergy" value="-" />
                        <Details label="Special Dietary Requirements" value="Lactose Intolerant" />
                    </div>
                </div>

                <div className="detailsSection" style={displaySection("3")}>
                    <div>
                        <h3>Next of Kin Details</h3>
                        <Details label="Name of Kin/Guardian" value="Tu Shen" />
                        <Details label="Relationship" value="Sister" />
                        <Details label="NRIC" value="T0182792C" />
                        <Details label="Blood Type" value="B-" />
                    </div>
                    <div>
                        <h3>Contact Information</h3>
                        <Details label="Postal Code" value="628364" />
                        <Details label="Address" value="290 Orchard Road #08-03 Paragon Medical Suites, 238859, Singapore" />
                        <Details label="Contact Number" value="87203323" />
                        <Details label="Email Address" value="tushen@email.com" />
                    </div>
                </div>
                <div className="detailsSection" style={displaySection("4")}>
                    <div>
                        <h3>Career Details</h3>
                        <Details label="Current Occupation" value="Accountant" />
                        <Details label="Current School/Organisation Name" value="DBS" />
                        <Details label="Current School/Organisation Address" value="2 Bayfront Ave, #01-30 The Shoppes at, Marina Bay Sands, Singapore 018972" />
                        <Details label="Current Person In-Charge &amp; Designation" value="Nendo / Boss" />
                        <Details label="Previous Educational Institution" value="Nanyang Technological University" />
                    </div>
                </div>
                <div className="detailsSection" style={displaySection("5")}>
                    <div>
                        <h3>Measurements</h3>
                        <Details label="Height" value="168cm" />
                        <Details label="Weight (kg)" value="65" />
                    </div>
                    <div>
                        <h3>Sizes</h3>
                        <Details label="Top Size" value="-" />
                        <Details label="Bottom Size" value="-" />
                        <Details label="Shoe Size" value="US 9" />
                    </div>
                    <div>
                        <h3>Sports Classification</h3>
                        <Details label="Classification Status" value="-" />
                        <Details label="Home Telephone Number" value="+65 6273 9172" />
                        <Details label="Level of Classification" value="-" />
                        <Details label="Athlete License Number" value="A9AODUAK" />
                    </div>
                    <div>
                        <h3>Sporting Achievements</h3>
                        <Details label="Year / Month" value="2018  Feb" />
                        <Details label="Location" value="Tokyo" />
                        <Details label="Name of Tournament" value="Paralympics" />
                        <Details label="Participation Type" value="-" />
                        <Details label="Results" value="Silver" />
                        <Details label="No. Of Competitors" value="23" />
                    </div>
                    <div>
                        <h3>Training Information</h3>
                        <Details label="Sports Tier" value="-" />
                        <Details label="Frequency" value="3 days per week" />
                        <Details label="Duration" value="2h" />
                        <Details label="Coaching Service Provider" value="-" />
                        <Details label="Coaching Qualifications" value="-" />
                        <Details label="Contract for Coaching Service Providers" value="-" />
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

export default MemberDetails;
