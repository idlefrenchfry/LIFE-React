function formatAMPM(format) {
    var a = format
    let hours, minutes;
    if (format.constructor.name === "Date") {
        hours = format.getHours();
        minutes = format.getMinutes();
    }

    else if (format.constructor.name === "String" && format.match("^[0-9]{2}:[0-9]{2}$")) {
        let splitTime = format.split(":");
        hours = splitTime[0]
        minutes = splitTime[1]
    }

    else
        throw "Unexpected parameter 'format' must be a valid date object or time string [HH:MM]!"
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes.toString().length == 1 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ampm;
    return strTime;
}

function ISOStringToDate(isostring) {
    let dateInMili = Date.parse(isostring); // Parse ISO string to get miliseconds since Jan 1st 1970 00:00:00 GMT
    let date = new Date(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(dateInMili);
    if (isNaN(date.getTime()))
        throw "Invalid ISO String: " + isostring;
    return date;
}

function ISOStringToDateInput(isostring) {
    let dateObj = ISOStringToDate(isostring);
    let monthString = (dateObj.getMonth() + 1).toString();
    let dateString = dateObj.getDate().toString();
    
    if (monthString.length === 1)
        monthString = "0" + monthString

    if (dateString.length === 1)
        dateString = "0" + dateString

    let defaultVal = dateObj.getFullYear() + 
                        "-" + monthString + 
                        "-" + dateString;

    return defaultVal;
}

function ISOStringToTimeInput(isostring) {
    let dateObj = ISOStringToDate(isostring);
    let hrString = dateObj.getHours().toString();
    let minString = dateObj.getMinutes().toString();

    
    if (hrString.length === 1)
        hrString = "0" + hrString

    if (minString.length === 1)
        minString = "0" + minString

    return hrString + ":" + minString;
}

function getDayName(day) {
    let weekdays = [
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
        "SUN"
    ]

    return weekdays[day];
}

function getMonthName(day) {
    let weekdays = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]

    return weekdays[day];
}

const isoRegExp = new RegExp("^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$");
const alphaReg = new RegExp("[A-Za-z]+$");
const alphaspaceReg = new RegExp("^[A-Za-z ]+$");
const numericReg = new RegExp("^[0-9]+$");
const nricReg = new RegExp("^[STFGstfg][0-9]{7}[A-Za-z]$");

let validationDic = {
    isostring: isoRegExp,
    alpha: alphaReg,
    alphaspace: alphaspaceReg,
    numeric: numericReg,
    nric: nricReg
}

export { formatAMPM, ISOStringToDate, getDayName, getMonthName, ISOStringToDateInput, ISOStringToTimeInput, validationDic };
