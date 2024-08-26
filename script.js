const timezones = [
    { name: "UTC", offset: 0 },
    { name: "GMT", offset: 0 },
    { name: "EST (Eastern Standard Time)", offset: -5 },
    { name: "CST (Central Standard Time)", offset: -6 },
    { name: "MST (Mountain Standard Time)", offset: -7 },
    { name: "PST (Pacific Standard Time)", offset: -8 },
    { name: "CET (Central European Time)", offset: 1 },
    { name: "IST (Indian Standard Time)", offset: 5.5 },
    { name: "JST (Japan Standard Time)", offset: 9 },
    { name: "AEDT (Australian Eastern Daylight Time)", offset: 11 },
];

document.getElementById('convertBtn').addEventListener('click', function() {
    const inputDateTime = document.getElementById('datetime').value;
    if (!inputDateTime) {
        alert("Please enter a date and time.");
        return;
    }

    const localDate = new Date(inputDateTime);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    timezones.forEach(tz => {
        const utcDate = new Date(localDate.getTime() + (tz.offset * 60 * 60 * 1000));
        const options = { timeZone: tz.name, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(utcDate);
        
        resultsDiv.innerHTML += `<div class="timezone">${tz.name} (GMT ${tz.offset >= 0 ? '+' : ''}${tz.offset}): ${formattedDate}</div>`;
    });
});
