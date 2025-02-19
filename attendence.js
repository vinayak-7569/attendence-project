let totalClasses = 0;
let fullDayPresent = 0;
let halfDayPresent = 0;
let absentCount = 0;
const requiredAttendancePercentage = 75;
let previousPercentage = 0;
let lastPlayedURL = "";

function markAttendance(type) {
    totalClasses++;

    if (type === 'full') fullDayPresent++;
    if (type === 'half') halfDayPresent++;
    if (type === 'absent') absentCount++;

    updateDisplay();
}

function updateDisplay() {
    let effectiveAttendance = fullDayPresent + (halfDayPresent * 0.5);
    let attendancePercentage = (effectiveAttendance / totalClasses) * 100 || 0;
    
    let status = attendancePercentage >= requiredAttendancePercentage ? "Meeting Requirement" : "Not Meeting Requirement";

    let percentageChange = attendancePercentage - previousPercentage;
    previousPercentage = attendancePercentage;

    document.getElementById("totalClasses").innerText = totalClasses;
    document.getElementById("fullDay").innerText = fullDayPresent;
    document.getElementById("halfDay").innerText = halfDayPresent;
    document.getElementById("absentCount").innerText = absentCount;
    document.getElementById("attendancePercentage").innerText = attendancePercentage.toFixed(2) + "%";
    document.getElementById("changeInPercentage").innerText = percentageChange.toFixed(2) + "%";
    document.getElementById("status").innerText = status;

    updateMemeAndMusic(attendancePercentage);
}

function updateMemeAndMusic(attendancePercentage) {
    let memeImage = document.getElementById("memeImage");
    let successMeme = document.getElementById("successMeme").value;
    let failMeme = document.getElementById("failMeme").value;
    let audioPlayer = document.getElementById("audioPlayer");
    let musicFile = document.getElementById("bgMusic").files[0];

    if (attendancePercentage >= requiredAttendancePercentage) {
        memeImage.src = successMeme || "https://i.imgflip.com/4t0m5.jpg"; // Default Success Meme
    } else {
        memeImage.src = failMeme || "https://i.imgflip.com/26am.jpg"; // Default Failure Meme
    }
    
    if (musicFile) {
        let musicURL = URL.createObjectURL(musicFile);
        
        // Only update the music if it's different from last played
        if (musicURL !== lastPlayedURL) {
            audioPlayer.src = musicURL;
            audioPlayer.play();
            lastPlayedURL = musicURL;
        }
    }
}