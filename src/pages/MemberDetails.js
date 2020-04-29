import React, { useState, useEffect } from 'react';
import { ISOStringToDate } from '../CommonFunctions';
import { Details } from '../components/ViewDetails';
import { cloneDeep } from 'lodash';

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
    trainingCsp: "",
    trainingCoachingQual: "",
    trainingCspContract: "",
}

const isoRegExp = new RegExp("^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$");

function MemberDetails(props) {
    // User
    const [member, setMember] = useState(user);

    useEffect(() => {
        let keys = Object.keys(member);
        let cloneMember = cloneDeep(member);
        let changed = false;

        for (let i = 0; i < keys.length; i++) {
            const property = keys[i];
            if (!cloneMember[property]) {
                cloneMember[property] = "-";
                changed = true;
            } else if (cloneMember[property].constructor.name === "String") {
                // If ISO String, convert to dd/mm/yyyy
                let match = cloneMember[property].match(isoRegExp);
                if (match) {
                    let dateObj = ISOStringToDate(match[0]);
                    console.log("dateObj: ", dateObj);
                    cloneMember[property] = dateObj.getDate() + "/" + 
                                            dateObj.getMonth() + "/" + 
                                            dateObj.getFullYear();
                    changed = true;
                }
            }
        }

        if (changed)
            setMember(cloneMember);
    }, [member])

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
    // let dob = ISOStringToDate(member.dob);
    // let dobStr = dob.getUTCDate() + "/" + dob.getMonth() + "/" + dob.getFullYear();

    // To do:
    // Next of kin tab onwards
    // Change empty properties with "-"

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
                        <Details label="Name" value={member.name} />
                        <Details label="Chinese Name" value={member.cName} />
                        <Details label="Blood Type" value={member.bloodType} />
                        <Details label="Gender" value={member.gender} />
                        <Details label="Date of Birth" value={member.dob} />
                        <Details label="Place of Birth" value={member.birthPlace} />
                        <Details label="Nationality" value={member.nationality} />
                        <Details label="Race" value={member.race} />
                        <Details label="Religion" value={member.religion} />
                        <Details label="Marital Status" value={member.maritalStatus} />
                        <Details label="Sports" value={member.sports} />
                        <Details label="Role" value={member.role} />
                    </div>
                    <div>
                        <h3>Contact Information</h3>
                        <Details label="Postal Code" value={member.postalCode} />
                        <Details label="Home Telephone Number" value={member.homeNo} />
                        <Details label="Mobile Number" value={member.mobileNo} />
                        <Details label="Email Address" value={member.email} />
                    </div>
                </div>

                <div className="detailsSection" style={displaySection("2")}>
                    <div>
                        <h3>Condition</h3>
                        <Details label="Disability/Medical Condition" value={member.disability} />
                        <Details label="Nature of Disability" value={member.natureOfDisability} />
                    </div>
                    <div>
                        <h3>Daily Aid Details</h3>
                        <Details label="Daily Aids (If Applicable)" value={member.dailyAids} />
                        <Details label="Estimated weight of Wheelchair (kg)" value={member.estimatedWeight} />
                        <Details label="Dimensions of Wheelchair" value={member.wheelchairDimension} />
                        <Details label="Type of Wheelchair" value={member.wheelchairType} />
                        <Details label="Wheel Diameter" value={member.wheelDiameter + "cm"} />
                    </div>
                    <div>
                        <h3>Dietary Requirements</h3>
                        <Details label="Food/Drug Allergy" value={member.foodDrugAllergy} />
                        <Details label="Special Dietary Requirements" value={member.specialDietaryReq} />
                    </div>
                </div>

                <div className="detailsSection" style={displaySection("3")}>
                    <div>
                        <h3>Next of Kin Details</h3>
                        <Details label="Name of Kin/Guardian" value={member.kinName} />
                        <Details label="Relationship" value={member.kinRelationship} />
                        <Details label="NRIC" value={member.kinNric} />
                        <Details label="Blood Type" value={member.kinBloodType} />
                    </div>
                    <div>
                        <h3>Contact Information</h3>
                        <Details label="Postal Code" value={member.kinPostalCode} />
                        <Details label="Address" value={member.kinAddress} />
                        <Details label="Contact Number" value={member.kinContactNumber} />
                        <Details label="Email Address" value={member.kinEmail} />
                    </div>
                </div>
                <div className="detailsSection" style={displaySection("4")}>
                    <div>
                        <h3>Career Details</h3>
                        <Details label="Current Occupation" value={member.currentOcc} />
                        <Details label="Current School/Organisation Name" value={member.currentOrg} />
                        <Details label="Current School/Organisation Address" value={member.currentOrgAddress} />
                        <Details label="Current Person In-Charge &amp; Designation" value={member.personInChargeAndDes} />
                        <Details label="Previous Educational Institution" value={member.prevEduInstitution} />
                    </div>
                </div>
                <div className="detailsSection" style={displaySection("5")}>
                    <div>
                        <h3>Measurements</h3>
                        <Details label="Height" value={member.height} />
                        <Details label="Weight (kg)" value={member.weight} />
                    </div>
                    <div>
                        <h3>Sizes</h3>
                        <Details label="Top Size" value={member.topSize} />
                        <Details label="Bottom Size" value={member.bottomSize} />
                        <Details label="Shoe Size (UK/US/Europe)" value={member.shoeSize} />
                    </div>
                    <div>
                        <h3>Sports Classification</h3>
                        <Details label="Classification Status" value={member.classificationStatus} />
                        <Details label="Date of Classification" value="12/12/2010" />
                        <Details label="Level of Classification" value={member.lvlOfClassification} />
                        <Details label="Athlete License Number" value={member.licenseNo} />
                    </div>
                    <div>
                        <h3>Sporting Achievements</h3>
                        <Details label="Year / Month" value={member.sptAchYM} />
                        <Details label="Location" value={member.sptAchLoc} />
                        <Details label="Name of Tournament" value={member.sptAchTourName} />
                        <Details label="Participation Type" value={member.sptAchParticipationType} />
                        <Details label="Results" value={member.sptAchResult} />
                        <Details label="No. Of Competitors" value={member.sptAchCompetitorNo} />
                    </div>
                    <div>
                        <h3>Training Information</h3>
                        <Details label="Sports Tier" value={member.trainingSportsTier} />
                        <Details label="Frequency" value={member.trainingFrequency} />
                        <Details label="Duration" value={member.trainingDuration} />
                        <Details label="Coaching Service Provider" value={member.trainingCsp} />
                        <Details label="Coaching Qualifications" value={member.trainingCoachingQual} />
                        <Details label="Contract for Coaching Service Providers" value={member.trainingCspContract} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberDetails;
