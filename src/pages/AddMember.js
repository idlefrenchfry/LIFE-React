import React, { useState, useEffect } from 'react';
import {ISOStringToDate, validationDic} from '../CommonFunctions';

let user = {
    name: "Xiu Ying",
    cName: "秀英",
    bloodType: "AB-",
    gender: "Female",
    dob: "1988-12-12T00:00:00.000Z",
    birthPlace: "Singapore",
    nationality: "Singapore",
    race: "Chinese",
    religion: "Atheist",
    maritalStatus: "Single",
    sports: "Archery",
    role: "Athlete",
    postalCode: "728383",
    homeNo: "+65 6273 9172",
    mobileNo: "+65 9817 7712",
    email: "xiuying@email.com",
    disability: "Paraplegia",
    natureOfDisability: "Others",
    dailyAids: "Wheelchair",
    estimatedWeight: 7,
    wheelchairDimension: "1.1m by 0.6m by 1.1m",
    wheelchairType: "All-Terrain Wheelchair",
    wheelDiameter: 45.7,
    foodDrugAllergy: "",
    specialDietaryReq: "Lactose Intolerant",
    kinName: "Tu Shen",
    kinRelationship: "Sister",
    kinNric: "T0182792C",
    kinBloodType: "B-",
    kinPostalCode: "628364",
    kinAddress: "290 Orchard Road #08-03 Paragon Medical Suites, 238859, Singapore",
    kinContactNumber: "87203323",
    kinEmail: "tushen@email.com",
    currentOcc: "Accountant",
    currentOrg: "DBS",
    currentOrgAddress: "2 Bayfront Ave, #01-30 The Shoppes at, Marina Bay Sands, Singapore 018972",
    personInChargeAndDes: "",
    prevEduInstitution: "Nanyang Technological University",
    height: 168,
    weight: 65,
    topSize: "",
    bottomSize: "",
    shoeSize: "US 9",
    classificationStatus: "",
    dateOfClassification: "2012-12-12T00:00:00.000Z",
    lvlOfClassification: "",
    licenseNo: "A9AODUAK",
    sptAchYM: "2018 / Feb",
    sptAchLoc: "Tokyo",
    sptAchTourName: "Paralympics",
    sptAchParticipationType: "",
    sptAchResult: "Silver",
    sptAchCompetitorNo: 23,
    trainingFrequency: "3 days / week",
    trainingSportsTier: "",
    trainingDuration: "2h",
    trainingLoc: "Yishun Stadium",
    trainingCsp: "",
    trainingCoachingQual: "",
    trainingCspContract: "",
}

let emptyUser = {
    name: "",
    cName: "",
    bloodType: "",
    gender: "",
    dob: "",
    birthPlace: "",
    nationality: "",
    race: "",
    religion: "",
    maritalStatus: "",
    sports: "",
    role: "",
    postalCode: "",
    homeNo: "",
    mobileNo: "",
    email: "",
    disability: "",
    natureOfDisability: "",
    dailyAids: "",
    estimatedWeight: "",
    wheelchairDimension: "",
    wheelchairType: "",
    wheelDiameter: "",
    foodDrugAllergy: "",
    specialDietaryReq: "",
    kinName: "",
    kinRelationship: "",
    kinNric: "",
    kinBloodType: "",
    kinPostalCode: "",
    kinAddress: "",
    kinContactNumber: "",
    kinEmail: "",
    currentOcc: "",
    currentOrg: "",
    currentOrgAddress: "",
    personInChargeAndDes: "",
    prevEduInstitution: "",
    height: "",
    weight: "",
    topSize: "",
    bottomSize: "",
    shoeSize: "",
    classificationStatus: "",
    dateOfClassification: "",
    lvlOfClassification: "",
    licenseNo: "",
    sptAchYM: "",
    sptAchLoc: "",
    sptAchTourName: "",
    sptAchParticipationType: "",
    sptAchResult: "",
    sptAchCompetitorNo: "",
    trainingFrequency: "",
    trainingSportsTier: "",
    trainingDuration: "",
    trainingCsp: "",
    trainingCoachingQual: "",
    trainingCspContract: "",
}

const isoRegExp = new RegExp("^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$");

function AddMembers(props) {

    const today = new Date();

    const [formHeader, setFormHeader] = useState("Add Member");

    const [member, setMember] = useState(emptyUser);

    useEffect(() => {
        if (props.location.pathname.includes("/Members/Edit/")) {

            // fetch member
            let objKeys = Object.keys(user);
            objKeys.forEach(key => {
                if(typeof(user[key]) === "string" && user[key].match(validationDic["isostring"])) {
                    let dateObj = ISOStringToDate(user[key]);
                    let monthString = dateObj.getMonth().toString();
                    let dateString = dateObj.getDate().toString();
                    
                    if (monthString.length === 1)
                        monthString = "0" + monthString

                    if (dateString.length === 1)
                        dateString = "0" + dateString

                    let defaultVal = dateObj.getFullYear() + 
                                     "-" + monthString + 
                                     "-" + dateString;

                    user[key] = defaultVal
                }
            });

            // Since default value doesn't work for select options
            let selectInputs = document.getElementsByTagName("select");
            for (let i = 0; i < selectInputs.length; i++) {
                let select = selectInputs[i];
                let selectId = select.id;
                
                if (user[selectId]) {
                    let options = select.childNodes;
                    for (let index = 0; index < options.length; index++) {
                        const option = options[index];
                        if (option.value === user[selectId]) {
                            option.setAttribute("selected", "");
                            break;
                        }
                    }
                }
            }
            
            setMember(user);
            setFormHeader("Edit Member");
        }
    }, [props.location.pathname])

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
            return "currentTab noselect";
        else
            return "noselect";
    }

    const inputUnfocus = (e) => {
        // onBlur
        console.log("On blur function was called for: ", e.target.id);
        let regEx = validationDic[e.target.getAttribute("regEx")]
        if (e.target.value && regEx) {
            if (!e.target.value.match(regEx))
                e.target.setAttribute("style", "border-color:rgba(255, 63, 52, 0.5)");
            else
                e.target.removeAttribute("style");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(e.target.elements);
        // window.location.href = "/Members";
    }

    const cancel = () => window.location.href = "/Members";

    // To Do:
    // Fix defaultValue for select options

    return (
        <div className="card">
            <div className="cardTop">
                <h1>{formHeader}</h1>
                <div className="buttonsSet">
                    <button onClick={cancel} className="noselect">Cancel</button>
                    <button form="form" className="noselect" id="submit">Save</button>
                </div>
            </div>

            <div className="sections">
                <span onClick={changeSection} className={displayTab("1")} id="tab1">Personal Details</span>
                <span onClick={changeSection} className={displayTab("2")} id="tab2">Medical Information</span>
                <span onClick={changeSection} className={displayTab("3")} id="tab3">Next of Kin</span>
                <span onClick={changeSection} className={displayTab("4")} id="tab4">Career Details</span>
                <span onClick={changeSection} className={displayTab("5")} id="tab5">Sports Details</span>
            </div>

            <form id="form" onSubmit={handleSubmit}>
                <div style={displaySection("1")}>
                    <div>
                        <h3>Particulars</h3>
                        <div className="inputs">
                            {/* ---------- NAME ---------- */}
                            <label htmlFor="eName">Name</label>
                            <br />
                            <input id="eName" name="eName" type="text" defaultValue={member.name} onBlur={inputUnfocus} regEx="alphaspace" />
                            <br />

                            {/* ---------- CHINESE NAME ---------- */}
                            <label htmlFor="cName">Chinese Name</label>
                            <br />
                            <input id="cName" name="cName" type="text" defaultValue={member.cName} />
                            <br />

                            {/* Splitting */}
                            <div className="split">
                                {/* ---------- GENDER ---------- */}
                                <div>
                                    <label htmlFor="gender">Gender</label>
                                    <br />
                                    <select id="gender" name="gender" defaultValue={member.gender}>
                                        <option value="">Select Gender</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                </div>

                                {/* ---------- USER BLOODTYPE ---------- */}
                                <div>
                                    <label htmlFor="bloodType">Blood Type</label>
                                    <br />
                                    <select id="bloodType" name="bloodType" style={{ width: "40%" }}>
                                        <option value="">-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </div>
                            </div>
                            <br />

                            {/* Splitting */}
                            <div className="split">
                                {/* ---------- DOB ---------- */}
                                <div>
                                    <label htmlFor="dob">Date of Birth</label>
                                    <input 
                                        type="date" 
                                        id="dob" 
                                        name="dob"
                                        max={today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate()} 
                                        defaultValue={member.dob} />
                                    <br />
                                </div>

                                {/* ---------- PLACE OF BIRTH ---------- */}
                                <div>
                                    <label htmlFor="birthplace">Place of Birth</label>
                                    <br />
                                    <input id="birthplace" name="birthplace" type="text" defaultValue={member.birthPlace} onBlur={inputUnfocus} regEx="alphaspace" />
                                    <br />
                                </div>
                            </div>

                            {/* ---------- NATIONALITY ---------- */}
                            <label htmlFor="nationality">Nationality</label>
                            <br />
                            <input id="nationality" name="nationality" type="text" defaultValue={member.nationality} onBlur={inputUnfocus} regEx="alphaspace" />
                            <br />

                            <div className="split">
                                {/* ---------- RACE ---------- */}
                                <div>
                                    <label htmlFor="race">Race</label>
                                    <br />
                                    <input id="race" name="race" type="text" defaultValue={member.race} />
                                    <br />
                                </div>

                                {/* ---------- RELIGION ---------- */}
                                <div>
                                    <label htmlFor="religion">Religion</label>
                                    <br />
                                    <input id="religion" name="religion" type="text" defaultValue={member.religion} />
                                    <br />
                                </div>
                            </div>

                            {/* ---------- MARITAL STATUS ---------- */}
                            <label htmlFor="marital">Marital Status</label>
                            <br />
                            <input id="marital" name="marital" type="text" defaultValue={member.maritalStatus} />
                            <br />

                            <div className="split">
                                {/* ---------- SPORTS ---------- */}
                                <div>
                                    <label htmlFor="sports">Sports</label>
                                    <br />
                                    <select id="sports" name="sports" defaultValue={member.sports}>
                                        <option value="">Sports</option>
                                        <option value="Archery">Archery</option>
                                        <option value="Badminton">Badminton</option>
                                        <option value="Basketball">Basketball</option>
                                        <option value="Football">Football</option>
                                        <option value="Table Tennis">Table Tennis</option>
                                    </select>
                                    <br />
                                </div>

                                {/* ---------- ROLE ---------- */}
                                <div>
                                    <label htmlFor="role">Role</label>
                                    <br />
                                    <input id="role" name="role" type="text" defaultValue={member.role} />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div>
                        <h3>Contact Information</h3>

                        <div className="inputs">
                            {/* POSTAL CODE */}
                            <label htmlFor="uPostal">Postal Code</label>
                            <br />
                            <input id="uPostal" name="uPostal" type="text" defaultValue={member.postalCode} />
                            <br />

                            {/* HOME TELEPHONE NUMBER */}
                            <label htmlFor="uHomeNo">Home Telephone Number</label>
                            <br />
                            <input id="uHomeNo" name="uHomeNo" type="text" defaultValue={member.homeNo} />
                            <br />

                            {/* MOBILE NUMBER */}
                            <label htmlFor="uMobileNo">Mobile Number</label>
                            <br />
                            <input id="uMobileNo" name="uMobileNo" type="text" defaultValue={member.mobileNo} />
                            <br />

                            {/* EMAIL ADDRESS */}
                            <label htmlFor="uEmailAddr">Email Address</label>
                            <br />
                            <input id="uEmailAddr" name="uEmailAddr" type="text" defaultValue={member.email} />
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("2")}>
                    <div>
                        <h3>Condition</h3>
                        <div className="inputs">
                            {/* ---------- DISABILITY/MEDICAL CONDITION ---------- */}
                            <label htmlFor="condition">Disability/Medical Condition</label>
                            <br />
                            <input id="condition" name="condition" type="text" defaultValue={member.disability} />
                            <br />

                            {/* ---------- NATURE OF DISABILITY ---------- */}
                            <label htmlFor="natureOfDisability">Nature of Disability</label>
                            <br />
                            <select id="natureOfDisability" name="natureOfDisability" defaultValue={member.natureOfDisability}>
                                <option value="Congenital">Congenital</option>
                                <option value="Others">Others</option>
                            </select>
                            <br />
                        </div>
                    </div>

                    <div>
                        <h3>Daily Aid Details</h3>
                        <div className="inputs">
                            {/* DALIY AID DETAILS */}
                            <label htmlFor="dailyAids">Daily Aids (If Applicable)</label>
                            <br />
                            <input id="dailyAids" name="dailyAids" type="text" defaultValue={member.dailyAids} />
                            <br />

                            {/* ESIMATED WEIGHT OF WHEELCHAIR*/}
                            <label htmlFor="wheelchairWeight">Estimated weight of Wheelchair (kg)</label>
                            <br />
                            <input id="wheelchairWeight" name="wheelchairWeight" type="text" defaultValue={member.estimatedWeight} onBlur={inputUnfocus} regEx="numeric" />
                            <br />

                            {/* DIMENSTIONS OF WHEELCHAIR */}
                            <label htmlFor="dimenstions">Dimensions of Wheelchair</label>
                            <br />
                            <input id="dimenstions" name="dimenstions" type="text" defaultValue={member.wheelchairDimension} />
                            <br />

                            {/* TYPE OF WHEELCHAIR */}
                            <label htmlFor="wheelchairType">Type of Wheelchair</label>
                            <br />
                            <input id="wheelchairType" name="wheelchairType" type="text" defaultValue={member.wheelchairType} />
                            <br />

                            {/* WHEEL DIAMETER */}
                            <label htmlFor="wheelDiam">Wheel Diameter</label>
                            <br />
                            <input id="wheelDiam" name="wheelDiam" type="text" defaultValue={member.wheelDiameter} />
                            <br />
                        </div>
                    </div>

                    <div>
                        <h3>Dietary Requirements</h3>
                        <div className="inputs">
                            {/* DIETARY REQUIREMENTS */}
                            <label htmlFor="allergy">Food/Drug Allergy</label>
                            <br />
                            <input id="allergy" name="allergy" type="text" defaultValue={member.foodDrugAllergy} />
                            <br />

                            {/* SPECIAL DIETARY REQUIREMENTS */}
                            <label htmlFor="dietaryReq">Special Dietary Requirements</label>
                            <br />
                            <input id="dietaryReq" name="dietaryReq" type="text" defaultValue={member.specialDietaryReq} />
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("3")}>
                    <div>
                        <h3>Next of Kin Details</h3>
                        <div className="inputs">
                            {/* ---------- KIN/GUARDIAN NAME ---------- */}
                            <label htmlFor="kgName">Name of Kin/Guardian</label>
                            <br />
                            <input id="kgName" name="kgName" type="text" defaultValue={member.kinName} onBlur={inputUnfocus} regEx="alphaspace" />
                            <br />

                            {/* ---------- RELATIONSHIP ---------- */}
                            <label htmlFor="kinRelationship">Relationship</label>
                            <br />
                            <select id="kinRelationship" name="kinRelationship" defaultValue={member.kinRelationship}>
                                <option value="Spouse">Spouse</option>
                                <option value="Brother">Brother</option>
                                <option value="Sister">Sister</option>
                                <option value="Father">Father</option>
                                <option value="Mother">Mother</option>
                            </select>
                            <br />

                            {/* ---------- NRIC ---------- */}
                            <label htmlFor="kgNric">NRIC</label>
                            <br />
                            <input id="kgNric" name="kgNric" type="text" defaultValue={member.kinNric} onBlur={inputUnfocus} regEx="nric" />
                            <br />

                            {/* ---------- BLOOD TYPE ---------- */}
                            <div className="split">
                                <div>
                                    <label htmlFor="kinBloodType">Blood Type</label>
                                    <br />
                                    <select id="kinBloodType" name="kinBloodType" style={{width: "40%"}} defaultValue={member.kinBloodType}>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Contact Information</h3>
                        <div className="inputs">
                            {/* POSTAL CODE */}
                            <label htmlFor="kgPostal">Postal Code</label>
                            <br />
                            <input id="kgPostal" name="kgPostal" type="text" defaultValue={member.kinPostalCode} />
                            <br />

                            {/* ADDRESS */}
                            <label htmlFor="kgAddress">Address</label>
                            <br />
                            <input id="kgAddress" name="kgAddress" type="text" defaultValue={member.kinAddress} />
                            <br />

                            {/* MOBILE NUMBER */}
                            <label htmlFor="kgContactNumber">Contact Number</label>
                            <br />
                            <input id="kgContactNumber" name="kgContactNumber" type="text" defaultValue={member.kinContactNumber} />
                            <br />

                            {/* EMAIL ADDRESS */}
                            <label htmlFor="kgEmailAddr">Email Address</label>
                            <br />
                            <input id="kgEmailAddr" name="kgEmailAddr" type="text" defaultValue={member.kinEmail} />
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("4")}>
                    <div>
                        <h3>Career Details</h3>
                        <div className="inputs">
                            {/* ---------- CURRENT OCCUPATION ---------- */}
                            <label htmlFor="currentOcc">Current Occupation</label>
                            <br />
                            <input id="currentOcc" name="currentOcc" type="text" defaultValue={member.currentOcc} />
                            <br />

                            {/* ---------- CURRENT SCHOOL/ORGNISATION NAME ---------- */}
                            <label htmlFor="currentOrgName">Current School/Organisation Name</label>
                            <br />
                            <input id="currentOrgName" name="currentOrgName" type="text" defaultValue={member.currentOrg} />
                            <br />

                            {/* ---------- CURRENT SCHOOL/ORGANISATION ADDRESS ---------- */}
                            <label htmlFor="currentOrgAddr">Current School/Organisation Address</label>
                            <br />
                            <input id="currentOrgAddr" name="currentOrgAddr" type="text"  defaultValue={member.currentOrgAddress}/>
                            <br />

                            {/* ---------- CURRENT PERSON IN-CHARGE & DESIGNATION ---------- */}
                            <label htmlFor="perInCharge">Current Person In-Charge &#38; Designation</label>
                            <br />
                            <input id="perInCharge" name="perInCharge" type="text" defaultValue={member.personInChargeAndDes} />
                            <br />

                            {/* ---------- PREVIOUS EDUCATIONAL INSTITUTION ---------- */}
                            <label htmlFor="prevEdInst">Previous Educational Institution</label>
                            <br />
                            <input id="prevEdInst" name="prevEdInst" type="text" defaultValue={member.prevEduInstitution} />
                            <br />
                        </div>
                    </div>
                </div>

                <div style={displaySection("5")}>
                    <div>
                        <h3>Measurements</h3>
                        <div className="inputs">
                            {/* ---------- HEIGHT ---------- */}
                            <label htmlFor="height">Height</label>
                            <br />
                            <input id="height" name="height" type="text" defaultValue={member.height} onBlur={inputUnfocus} regEx="numeric" />
                            <br />

                            {/* ---------- WEIGHT ---------- */}
                            <label htmlFor="weight">Weight (kg)</label>
                            <br />
                            <input id="weight" name="weight" type="text" defaultValue={member.weight} onBlur={inputUnfocus} regEx="numeric" />
                            <br />
                        </div>
                    </div>

                    <br />

                    <div>
                        <h3>Sizes</h3>
                        <div className="inputs">
                            {/* ---------- TOP SIZE ---------- */}
                            <label htmlFor="topsize">Top Size</label>
                            <br />
                            <input id="topSize" name="topSize" type="text" defaultValue={member.topSize} />
                            <br />

                            {/* ---------- TOP SIZE ---------- */}
                            <label htmlFor="bottomSize">Bottom Size</label>
                            <br />
                            <input id="bottomSize" name="bottomSize" type="text" defaultValue={member.bottomSize} />
                            <br />

                            {/* ---------- SHOE SIZE ---------- */}
                            <label htmlFor="shoeSize">Shoe Size (UK/US/Europe)</label>
                            <br />
                            <input id="shoeSize" name="shoeSize" type="text" defaultValue={member.shoeSize} />
                            <br />
                        </div>
                    </div>

                    <br />

                    <div>
                        <h3>Sports Classification</h3>

                        <div className="inputs">
                            {/* ---------- CLASSIFICATION STATUS ---------- */}
                            <label htmlFor="classStatus">Classification Status</label>
                            <br />
                            <input id="classStatus" name="classStatus" type="text" defaultValue={member.classificationStatus} />
                            <br />

                            {/* ---------- DATE OF CLASSIFICATION ---------- */}
                            <label htmlFor="dateClassification">Date of Classification</label>
                            <br />
                            <input id="dateClassification" name="dateClassification" type="date" defaultValue={member.dateOfClassification} />
                            <br />

                            {/* ---------- LEVEL OF CLASSIFICATION ---------- */}
                            <label htmlFor="classLvl">Level of Classification</label>
                            <br />
                            <input id="classLvl" name="classLvl" type="text" defaultValue={member.lvlOfClassification} />
                            <br />

                            {/* ---------- ATHLETE LICENSE NUMBER ---------- */}
                            <label htmlFor="licsNo">Athlete License Number</label>
                            <br />
                            <input id="licsNo" name="licsNo" type="text" defaultValue={member.licenseNo} />
                            <br />

                            {/* ---------- SPORTS CLASSIFICATION UPLOAD ---------- */}
                            <label htmlFor="sportsDocs">Upload Documents</label>
                            <br />
                            <input id="sportsDocs" name="sportsDocs" type="file" multiple />
                            <br />
                        </div>
                    </div>

                    <br />

                    <div>
                        <h3>Sporting Achievements</h3>
                        <div className="inputs">
                            {/* ---------- YEAR ? MONTH ---------- */}
                            <label htmlFor="achYM">Year / Month</label>
                            <br />
                            <input id="achYM" name="achYM" type="text" defaultValue={member.sptAchYM} />
                            <br />

                            {/* ---------- LOCATIOn ---------- */}
                            <label htmlFor="achLocation">Location</label>
                            <br />
                            <input id="achLocation" name="achLocation" type="text" defaultValue={member.sptAchLoc} />
                            <br />

                            {/* ---------- NAME OF TOUNRAMENT ---------- */}
                            <label htmlFor="tournName">Name of Tournament</label>
                            <br />
                            <input id="tournName" name="tournName" type="text" defaultValue={member.sptAchTourName} />
                            <br />

                            {/* ---------- EVENT (?) ---------- */}
                            <label htmlFor="eventType">Event</label>
                            <br />
                            <input id="eventType" name="eventType" type="text" defaultValue={member.sptAchParticipationType} />
                            <br />

                            {/* ---------- PARTICIPATION TYPE ---------- */}
                            <label htmlFor="parType">Participation Type</label>
                            <br />
                            <input id="parType" name="parType" type="text" defaultValue={member.sptAchParticipationType} />
                            <br />

                            {/* ---------- RESULTS ---------- */}
                            <label htmlFor="results">Results</label>
                            <br />
                            <input id="results" name="results" type="text" defaultValue={member.sptAchResult} />
                            <br />

                            {/* ---------- NO OF COMPETITORS ---------- */}
                            <label htmlFor="compNo">No. Of Competitors</label>
                            <br />
                            <input id="compNo" name="compNo" type="text" defaultValue={member.sptAchCompetitorNo} />
                            <br />
                        </div>
                    </div>

                    <br />

                    <div>
                        <h3>Training Information</h3>

                        <div className="inputs">
                            {/* ---------- SPORTS TIER ---------- */}
                            <label htmlFor="sportsTier">Sports Tier</label>
                            <br />
                            <input id="sportsTier" name="sportsTier" type="text" defaultValue={member.trainingSportsTier} />
                            <br />

                            {/* ---------- FREQUENCY ---------- */}
                            <label htmlFor="freq">Frequency</label>
                            <br />
                            <input id="freq" name="freq" type="text" defaultValue={member.trainingFrequency} />
                            <br />

                            {/* ---------- DURATION ---------- */}
                            <label htmlFor="duration">Duration</label>
                            <br />
                            <input id="duration" name="duration" type="text" defaultValue={member.trainingDuration} />
                            <br />

                            {/* ---------- TRAINING LOCATION ---------- */}
                            <label htmlFor="trainingLocation">Location</label>
                            <br />
                            <input id="trainingLocation" name="trainingLocation" type="text" defaultValue={member.trainingLoc} />
                            <br />

                            {/* ---------- COACHING SERVICE PROVIDER ---------- */}
                            <label htmlFor="csp">Coaching Service Provider</label>
                            <br />
                            <input id="csp" name="csp" type="text" defaultValue={member.trainingCsp} />
                            <br />

                            {/* ---------- RESUME / CV? UPLOAD DOCUMENTS?? ---------- */}
                            <label htmlFor="cv">Resume / CV? Upload Document?</label>
                            <br />
                            <input id="cv" name="cv" type="text" />
                            <br />

                            {/* ---------- COACHING QUALIFICATIONS ---------- */}
                            <label htmlFor="coachingQual">Coaching Qualifications</label>
                            <br />
                            <input id="coachingQual" name="coachingQual" type="text" defaultValue={member.trainingCoachingQual} />
                            <br />

                            {/* ---------- CONTRACT FOR COACHING SERVICE PROVIDERS ---------- */}
                            <label htmlFor="contractCsp">Contract for Coaching Service Providers</label>
                            <br />
                            <input id="contractCsp" name="contractCsp" type="text" multiple/>
                            <br />

                            {/* ---------- TRAINING INFORMATION UPLOAD ---------- */}
                            <label htmlFor="trainingDocs">Upload Documents</label>
                            <br />
                            <input id="trainingDocs" name="trainingDocs" type="file" multiple />
                            <br />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddMembers;
