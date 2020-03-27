import React, { useEffect, useState } from 'react';

function AddMembers() {

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
            return {display: "none"};
        else
            return {display: "block"};
    }

    // Change style of tab depending on current section
    const displayTab = (id) => {
        if (currentSection.slice(-1) === id)
            return "currentTab ";
        else
            return "";
    }

    // const submitForm = () => document.getElementById('form').submit();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(e.target.elements);
        // window.location.href = "/Members";
    }

    const cancel = () => window.location.href = "/Members";

    return (
        <div className="card">
            <div className="cardTop">
                <h1>Add Member</h1>
                <div className="buttonsSet">
                    <button onClick={cancel} className="noselect">Cancel</button>
                    <button form="form" className="noselect" id="submit">Save</button>
                </div>
            </div>

            <div className="sections">
                <span onClick={changeSection} className={displayTab("1") + "noselect"} id="tab1">Personal Details</span>
                <span onClick={changeSection} className={displayTab("2") + "noselect"} id="tab2">Medical Information</span>
                <span onClick={changeSection} className={displayTab("3") + "noselect"} id="tab3">Next of Kin</span>
                <span onClick={changeSection} className={displayTab("4") + "noselect"} id="tab4">Career Details</span>
                <span onClick={changeSection} className={displayTab("5") + "noselect"} id="tab5">Sports Details</span>
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

                            {/* ---------- CHINESE NAME ---------- */}
                            <label htmlFor="cName">Chinese Name</label>
                            <br />
                            <input id="cName" name="cName" type="text"></input>
                            <br />

                            {/* ---------- GENDER ---------- */}
                            <label htmlFor="gender">Gender</label>
                            <br />
                            <select className="split" id="gender" name="gender">
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>

                            {/* ---------- USER BLOODTYPE ---------- */}
                            <label htmlFor="uBloodtype">Blood Type</label>
                            <select className="split" id="uBloodtype" name="uBloodtype">
                                <option value="opos">O positive</option>
                                <option value="oneg">O negative</option>
                                <option value="apos">A positive</option>
                                <option value="aneg">A negative</option>
                                <option value="bpos">B positive</option>
                                <option value="bneg">B negative</option>
                                <option value="abpoos">AB positive</option>
                                <option value="abneg">AB negative</option>
                            </select>
                            <br />

                            {/* ---------- DOB ---------- */}
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob" name="dob"
                                max={today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate()}></input>
                            <br />
                            {/* PLACE OF BIRTH */}
                            <label htmlFor="birthplace">Place of Birth</label>
                            <br />
                            <input id="birthplace" name="birthplace" type="text"></input>
                            <br />

                            {/* NATIONALITY */}
                            <label htmlFor="nationality">Nationality</label>
                            <br />
                            <input id="nationality" name="nationality" type="text"></input>
                            <br />

                            {/* RACE */}
                            <label htmlFor="race">Race</label>
                            <br />
                            <input id="race" name="race" type="text"></input>
                            <br />

                            {/* RELIGION */}
                            <label htmlFor="religion">Religion</label>
                            <br />
                            <input id="religion" name="religion" type="text"></input>
                            <br />

                            {/* MARITAL STATUS */}
                            <label htmlFor="marital">Marital Status</label>
                            <br />
                            <input id="marital" name="marital" type="text"></input>
                            <br />

                            {/* SPORTS */}
                            <label htmlFor="sports">Sports</label>
                            <br />
                            <input id="sports" name="sports" type="text"></input>
                            <br />

                            {/* ROLE */}
                            <label htmlFor="role">Role</label>
                            <br />
                            <input id="role" name="role" type="text"></input>
                            <br />
                        </div>
                    </div>

                    <br />

                    <div id="contactInfo">
                        <h3>Contact Information</h3>

                        <div className="inputs">
                            {/* POSTAL CODE */}
                            <label htmlFor="uPostal">Postal Code</label>
                            <br />
                            <input id="uPostal" name="uPostal" type="text"></input>
                            <br />

                            {/* HOME TELEPHONE NUMBER */}
                            <label htmlFor="uHomeNo">Home Telephone Number</label>
                            <br />
                            <input id="uHomeNo" name="uHomeNo" type="text"></input>
                            <br />

                            {/* MOBILE NUMBER */}
                            <label htmlFor="uMobileNo">Mobile Number</label>
                            <br />
                            <input id="uMobileNo" name="uMobileNo" type="text"></input>
                            <br />

                            {/* EMAIL ADDRESS */}
                            <label htmlFor="uEmailAddr">Email Address</label>
                            <br />
                            <input id="uEmailAddr" name="uEmailAddr" type="text"></input>
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("2")}>
                    <div className="condition">
                        <h3>Condition</h3>
                        <div className="inputs">
                            {/* ---------- DISABILITY/MEDICAL CONDITION ---------- */}
                            <label htmlFor="condition">Disability/Medical Condition</label>
                            <br />
                            <input id="condition" name="condition" type="text"></input>
                            <br />

                            {/* ---------- NATURE OF DISABILITY ---------- */}
                            <label htmlFor="natureOfDis">Nature of Disability</label>
                                <br />
                                <select id="natureOfDis" name="natureOfDis">
                                    <option value="congenital">Congenital</option>
                                    <option value="others">Others</option>
                                </select>

                            {/* DALIY AID DETALIS */}
                            <label htmlFor="dailyAids">Daily Aids (If Applicable)</label>
                            <br />
                            <input id="dailyAids" name="dailyAids" type="text"></input>
                            <br />

                            {/* ESIMATED */}
                            <label htmlFor="condition">Disability/Medical Condition</label>
                            <br />
                            <input id="condition" name="condition" type="text"></input>
                            <br />
                        </div>
                    </div>

                    <div className="dailyaid">
                        <h3>Daily Aid Details</h3>
                        <div className="inputs">
                            {/* DALIY AID DETALIS */}
                            <label htmlFor="dailyAids">Daily Aids (If Applicable)</label>
                            <br />
                            <input id="dailyAids" name="dailyAids" type="text"></input>
                            <br />

                            {/* ESIMATED WEIGHT OF WHEELCHAIR*/}
                            <label htmlFor="wheelchairWeight">Estimated weight of Wheelchair (kg)</label>
                            <br />
                            <input id="wheelchairWeight" name="wheelchairWeight" type="text"></input>
                            <br />

                            {/* DIMENSTIONS OF WHEELCHAIR */}
                            <label htmlFor="dimenstions">Dimensions of Wheelchair</label>
                            <br />
                            <input id="dimenstions" name="dimenstions" type="text"></input>
                            <br />

                            {/* TYPE OF WHEELCHAIR */}
                            <label htmlFor="wheelchairType">Type of Wheelchair</label>
                            <br />
                            <input id="wheelchairType" name="wheelchairType" type="text"></input>
                            <br />

                            {/* WHEEL DIAMETER */}
                            <label htmlFor="wheelDiam">Wheel Diameter</label>
                            <br />
                            <input id="wheelDiam" name="wheelDiam" type="text"></input>
                            <br />

                            {/* DIETARY REQUIREMENTS */}
                            <label htmlFor="allergy">Food/Drug Allergy</label>
                            <br />
                            <input id="allergy" name="allergy" type="text"></input>
                            <br />

                            {/* SPECIAL DIETARY REQUIREMENTS */}
                            <label htmlFor="dietaryReq">Special Dietary Requirements</label>
                            <br />
                            <input id="dietaryReq" name="dietaryReq" type="text"></input>
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("3")}>
                    <div className="condition">
                        <h3>Next of Kin Details</h3>
                        <div className="inputs">
                            {/* ---------- KIN/GUARDIAN NAME ---------- */}
                            <label htmlFor="kgName">Name of Kin/Guardian</label>
                            <br />
                            <input id="kgName" name="kgName" type="text"></input>
                            <br />

                            {/* ---------- RELATIONSHIP ---------- */}
                            <label htmlFor="reltaionship">Relationship</label>
                            <br />
                            <select id="relationship" name="relationship">
                                <option value="spouse">Spouse</option>
                                <option value="brother">Brother</option>
                                <option value="sister">Sister</option>
                                <option value="father">Father</option>
                                <option value="mother">Mother</option>
                            </select>
                            <br />

                            {/* ---------- NRIC ---------- */}
                            <label htmlFor="kgNric">NRIC</label>
                            <br />
                            <input id="kgNric" name="kgNric" type="text"></input>
                            <br />

                            {/* ---------- BLOOD TYPE ---------- */}
                            <label htmlFor="kgBloodtype">Blood Type</label>
                            <br />
                            <select className="split" id="kgBloodtype" name="kgBloodtype">
                                <option value="opos">O positive</option>
                                <option value="oneg">O negative</option>
                                <option value="apos">A positive</option>
                                <option value="aneg">A negative</option>
                                <option value="bpos">B positive</option>
                                <option value="bneg">B negative</option>
                                <option value="abpoos">AB positive</option>
                                <option value="abneg">AB negative</option>
                            </select>
                            <br />
                        </div>
                    </div>

                    <div className="kgContactInfo">
                        <h3>Contact Information</h3>
                        <div className="inputs">
                            {/* POSTAL CODE */}
                            <label htmlFor="kgPostal">Postal Code</label>
                            <br />
                            <input id="kgPostal" name="kgPostal" type="text"></input>
                            <br />

                            {/* ADDRESS */}
                            <label htmlFor="kgAddress">Address</label>
                            <br />
                            <input id="kgAddress" name="kgAddress" type="text"></input>
                            <br />

                            {/* MOBILE NUMBER */}
                            <label htmlFor="kgContactNumber">Contact Number</label>
                            <br />
                            <input id="kgContactNumber" name="kgContactNumber" type="text"></input>
                            <br />

                            {/* EMAIL ADDRESS */}
                            <label htmlFor="kgEmailAddr">Email Address</label>
                            <br />
                            <input id="kgEmailAddr" name="kgEmailAddr" type="text"></input>
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("4")}>
                    <div className="career">
                        <h3>Career Details</h3>
                        <div className="inputs">
                            {/* ---------- CURRENT OCCUPATION ---------- */}
                            <label htmlFor="currentOcc">Current Occupation</label>
                            <br />
                            <input id="currentOcc" name="currentOcc" type="text"></input>
                            <br />

                            {/* ---------- CURRENT SCHOOL/ORGNISATION NAME ---------- */}
                            <label htmlFor="currentOrgName">Current School/Organisation Name</label>
                            <br />
                            <input id="currentOrgName" name="currentOrgName" type="text"></input>
                            <br />

                            {/* ---------- CURRENT SCHOOL/ORGANISATION ADDRESS ---------- */}
                            <label htmlFor="currentOrgAddr">Current School/Organisation Address</label>
                            <br />
                            <input id="currentOrgAddr" name="currentOrgAddr" type="text"></input>
                            <br />

                            {/* ---------- CURRENT PERSON IN-CHARGE & DESIGNATION ---------- */}
                            <label htmlFor="perInCharge">Current Person In-Charge &#38; Designation</label>
                            <br />
                            <input id="perInCharge" name="perInCharge" type="text"></input>
                            <br />

                            {/* ---------- PREVIOUS EDUCATIONAL INSTITUTION ---------- */}
                            <label htmlFor="prevEdInst">Previous Educational Institution</label>
                            <br />
                            <input id="prevEdInst" name="prevEdInst" type="text"></input>
                            <br />
                        </div>
                    </div>

                    <div className="kgContactInfo">
                        <h3>Contact Information</h3>
                        <div className="inputs">
                            {/* POSTAL CODE */}
                            <label htmlFor="kgPostal">Postal Code</label>
                            <br />
                            <input id="kgPostal" name="kgPostal" type="text"></input>
                            <br />

                            {/* ADDRESS */}
                            <label htmlFor="kgAddress">Address</label>
                            <br />
                            <input id="kgAddress" name="kgAddress" type="text"></input>
                            <br />

                            {/* MOBILE NUMBER */}
                            <label htmlFor="kgContactNumber">Contact Number</label>
                            <br />
                            <input id="kgContactNumber" name="kgContactNumber" type="text"></input>
                            <br />

                            {/* EMAIL ADDRESS */}
                            <label htmlFor="kgEmailAddr">Email Address</label>
                            <br />
                            <input id="kgEmailAddr" name="kgEmailAddr" type="text"></input>
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("5")}>
                    <div id="measurements">
                        <h3>Measurements</h3>
                        <div className="inputs">
                            {/* ---------- HEIGHT ---------- */}
                            <label htmlFor="height">Height</label>
                            <br />
                            <input id="height" name="height" type="text"></input>
                            <br />

                            {/* ---------- WEIGHT ---------- */}
                            <label htmlFor="weight">Weight (kg)</label>
                            <br />
                            <input id="weight" name="weight" type="text"></input>
                            <br />
                        </div>
                    </div>

                    <br />

                    <div id="sizes">
                        <h3>Sizes</h3>
                        <div className="inputs">
                            {/* ---------- TOP SIZE ---------- */}
                            <label htmlFor="topsize">Top Size</label>
                            <br />
                            <input id="topSize" name="topSize" type="text"></input>
                            <br />

                            {/* ---------- TOP SIZE ---------- */}
                            <label htmlFor="bottomSize">Bottom Size</label>
                            <br />
                            <input id="bottomSize" name="bottomSize" type="text"></input>
                            <br />

                            {/* ---------- SHOE SIZE ---------- */}
                            <label htmlFor="shoeSize">Shoe Size</label>
                            <br />
                            <input id="shoeSize" name="shoeSize" type="text"></input>
                            <br />
                        </div>
                    </div>

                    <br />

                    <div id="sportsClassification">
                        <h3>Sports Classification</h3>

                        <div className="inputs">
                            {/* ---------- CLASSIFICATION STATUS ---------- */}
                            <label htmlFor="classStatus">Classification Status</label>
                            <br />
                            <input id="classStatus" name="classStatus" type="text"></input>
                            <br />

                            {/* ---------- DATE OF CLASSIFICATION come back ---------- */}
                            <label htmlFor="uHomeNo">Home Telephone Number</label>
                            <br />
                            <input id="uHomeNo" name="uHomeNo" type="text"></input>
                            <br />

                            {/* ---------- LEVEL OF CLASSIFICATION ---------- */}
                            <label htmlFor="classLvl">Level of Classification</label>
                            <br />
                            <input id="classLvl" name="classLvl" type="text"></input>
                            <br />

                            {/* ---------- ATHLETE LICENSE NUMBER ---------- */}
                            <label htmlFor="licsNo">Athlete License Number</label>
                            <br />
                            <input id="licsNo" name="licsNo" type="text"></input>
                            <br />

                            {/* ---------- ATHLETE LICENSE NUMBER ---------- */}
                            <label htmlFor="sportsDocs">Upload Documents</label>
                            <br />
                            <input id="sportsDocs" name="sportsDocs" type="file" multiple></input>
                            <br />
                        </div>
                    </div>

                    <br />

                    <div id="sportAchievements">
                        <h3>Sporting Achievements</h3>
                        <div className="inputs">
                            {/* ---------- YEAR ? MONTH ---------- */}
                            <label htmlFor="achYM">Year / Month</label>
                            <br />
                            <input id="currentOcc" name="currentOcc" type="text"></input>
                            <br />

                            {/* ---------- LOCATIOn ---------- */}
                            <label htmlFor="achLocation">Location</label>
                            <br />
                            <input id="achLocation" name="achLocation" type="text"></input>
                            <br />

                            {/* ---------- NAME OF TOUNRAMENT ---------- */}
                            <label htmlFor="tournName">Name of Tournament</label>
                            <br />
                            <input id="tournName" name="tournName" type="text"></input>
                            <br />

                            {/* ---------- PARTICIPATION TYPE ---------- */}
                            <label htmlFor="parType">Participation Type</label>
                            <br />
                            <input id="parType" name="parType" type="text"></input>
                            <br />

                            {/* ---------- RESULTS ---------- */}
                            <label htmlFor="results">Results</label>
                            <br />
                            <input id="results" name="results" type="text"></input>
                            <br />

                            {/* ---------- NO OF COMPETITORS ---------- */}
                            <label htmlFor="compNo">No. Of Competitors</label>
                            <br />
                            <input id="compNo" name="compNo" type="text"></input>
                            <br />
                        </div>
                    </div>

                    <br />

                    <div id="trainingInfo">
                        <h3>Training Information</h3>

                        <div className="inputs">
                            {/* ---------- SPORTS TIER ---------- */}
                            <label htmlFor="sportsTier">Sports Tier</label>
                            <br />
                            <input id="sportsTier" name="sportsTier" type="text"></input>
                            <br />

                            {/* ---------- FREQUENCY ---------- */}
                            <label htmlFor="freq">Frequency</label>
                            <br />
                            <input id="freq" name="freq" type="text"></input>
                            <br />

                            {/* ---------- DURATION ---------- */}
                            <label htmlFor="duration">Duration</label>
                            <br />
                            <input id="duration" name="duration" type="text"></input>
                            <br />

                            {/* ---------- LOCATION ---------- */}
                            <label htmlFor="licsNo">Athlete License Number</label>
                            <br />
                            <input id="licsNo" name="licsNo" type="text"></input>
                            <br />

                            {/* ---------- COACHING SERVICE PROVIDER ---------- */}
                            <label htmlFor="csp">Coaching Service Provider</label>
                            <br />
                            <input id="csp" name="csp" type="text" ></input>
                            <br />

                            {/* ---------- RESUME / CV? UPLOAD DOCUMENTS?? ---------- */}
                            <label htmlFor="cv">Resume / CV? Upload Document?</label>
                            <br />
                            <input id="cv" name="cv" type="text"></input>
                            <br />

                            {/* ---------- COACHING QUALIFICATIONS ---------- */}
                            <label htmlFor="coachingQual">Coaching Qualifications</label>
                            <br />
                            <input id="coachingQual" name="coachingQual" type="text"></input>
                            <br />

                            {/* ---------- CONTRACT FOR COACHING SERVICE PROVIDERS ---------- */}
                            <label htmlFor="contractCsp">Contract for Coaching Service Providers</label>
                            <br />
                            <input id="contractCsp" name="contractCsp" type="text" multiple></input>
                            <br />

                            {/* ---------- COACHING SERVICE PROVIDER ---------- */}
                            <label htmlFor="trainingDocs">Upload Documents</label>
                            <br />
                            <input id="trainingDocs" name="trainingDocs" type="file" multiple></input>
                            <br />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddMembers;
