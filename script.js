const timezones = {
    "UTC": 0,
    "GMT": 0,
    "EST": -5,
    "EDT": -4,
    "CST": -6,
    "CDT": -5,
    "MST": -7,
    "MDT": -6,
    "PST": -8,
    "PDT": -7,
    "CET": 1,
    "CEST": 2,
    "IST": 5.5,
    "CST (China)": 8,
    "JST": 9,
    "KST": 9,
    "AEDT": 11,
    "ACDT": 10.5,
    "AWST": 8,
    "NZDT": 13,
    "NZST": 12,
};

document.getElementById('convertBtn').addEventListener('click', function() {
    const inputDateTime = document.getElementById('datetime').value;
    const selectedTimezone = document.getElementById('timezone').value;
    
    if (!inputDateTime) {
        alert("Please enter a date and time.");
        return;
    }

    const localDate = new Date(inputDateTime);
    const offset = timezones[selectedTimezone];
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Convert the local date to UTC based on the selected timezone
    const utcDate = new Date(localDate.getTime() + (offset * 60 * 60 * 1000));

    // Display the time in each timezone
    for (const [tz, tzOffset] of Object.entries(timezones)) {
        const convertedDate = new Date(utcDate.getTime() + (tzOffset * 60 * 60 * 1000));
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(convertedDate);
        
        resultsDiv.innerHTML += `<div class="timezone">${tz} (GMT ${tzOffset >= 0 ? '+' : ''}${tzOffset}): ${formattedDate}</div>`;
    }

    // Generate the URL
    const date = localDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const time = localDate.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
    const url = `?date=${date}&time=${time}&timezone=${selectedTimezone}`;
    
    // Display the generated URL
    document.getElementById('generatedUrl').value = window.location.origin + url;
});
