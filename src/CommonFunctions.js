function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ampm;
    return strTime;
}

function ISOStringToDate(isostring) {
    let dateInMili = Date.parse(isostring); // Parse ISO string to get miliseconds since Jan 1st 1970 00:00:00 GMT
    let date = new Date(0);
    date.setMilliseconds(dateInMili);
    return date;
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

export { formatAMPM, ISOStringToDate, validationDic };
