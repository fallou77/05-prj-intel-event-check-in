const form = document.getElementById("checkInForm");
const attendeeName = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");
const maxAttendees = 50;
let totalAttendees = Number(localStorage.getItem("totalAttendees")) || 0;
let teamCounts = JSON.parse(localStorage.getItem("teamCounts")) || {
  water: 0,
  zero: 0,
  power: 0,
};
let attendees = JSON.parse(localStorage.getItem("attendees")) || [];
const teamNames = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables",
};
function updatePage() {
  attendeeCount.textContent = totalAttendees;
  waterCount.textContent = teamCounts.water;
  zeroCount.textContent = teamCounts.zero;
  powerCount.textContent = teamCounts.power;
  const progressPercent = (totalAttendees / maxAttendees) * 100;
  progressBar.style.width = progressPercent + "%";
  displayAttendees();
  if (totalAttendees >= maxAttendees) {
    showCelebration();
  }
}
function saveProgress() {
  localStorage.setItem("totalAttendees", totalAttendees);
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
  localStorage.setItem("attendees", JSON.stringify(attendees));
}
function displayAttendees() {
  let attendeeList = document.getElementById("attendeeList");
  if (!attendeeList) {
    attendeeList = document.createElement("div");
    attendeeList.id = "attendeeList";
    attendeeList.className = "attendee-list";
    const teamStats = document.querySelector(".team-stats");
    teamStats.appendChild(attendeeList);
  }
  attendeeList.innerHTML = "<h3>Checked-In Attendees</h3>";
  attendees.forEach(function (person) {
    const item = document.createElement("p");
    item.textContent = `${person.name} — ${teamNames[person.team]}`;
    attendeeList.appendChild(item);
  });
}
function showCelebration() {
  let winningTeam = "water";
  if (teamCounts.zero > teamCounts[winningTeam]) {
    winningTeam = "zero";
  }
  if (teamCounts.power > teamCounts[winningTeam]) {
    winningTeam = "power";
  }
  greeting.textContent = `🎉 Goal reached! ${teamNames[winningTeam]} is the winning team!`;
  greeting.classList.add("success-message");
  greeting.style.display = "block";
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = attendeeName.value.trim();
  const team = teamSelect.value;
  if (name === "" || team === "") {
    return;
  }
  if (totalAttendees >= maxAttendees) {
    showCelebration();
    form.reset();
    return;
  }
  totalAttendees++;
  teamCounts[team]++;
  attendees.push({ name: name, team: team });
  greeting.textContent = `🎉 Welcome, ${name} from ${teamNames[team]}!`;
  greeting.classList.add("success-message");
  greeting.style.display = "block";
  saveProgress();
  updatePage();
  form.reset();
});
updatePage();
