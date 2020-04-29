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

export { formatAMPM, ISOStringToDate};
