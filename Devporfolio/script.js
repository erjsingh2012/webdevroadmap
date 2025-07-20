const skills = [
  "HTML & CSS", "Responsive Design", "JavaScript", "Git & GitHub",
  "React.js", "Node.js", "PostgreSQL", "MongoDB", "Docker",
  "Authentication", "CI/CD", "System Design"
];

const skillContainer = document.getElementById("skills-list");

// Load saved state
window.onload = function () {
  const saved = JSON.parse(localStorage.getItem("skills") || "{}");
  skills.forEach(skill => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = saved[skill] || false;
    input.onchange = () => saveProgress();
    label.appendChild(input);
    label.append(skill);
    skillContainer.appendChild(label);
    skillContainer.appendChild(document.createElement("br"));
  });

  // Log history
  document.getElementById("log-history").innerHTML =
    localStorage.getItem("logs") || "<p>No logs yet.</p>";

  // Dark mode
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};

function saveProgress() {
  const checkboxes = document.querySelectorAll("#skills-list input");
  const state = {};
  checkboxes.forEach((cb, i) => {
    state[skills[i]] = cb.checked;
  });
  localStorage.setItem("skills", JSON.stringify(state));
}

function saveLog() {
  const entry = document.getElementById("log-entry").value;
  const date = new Date().toLocaleDateString();
  const previous = localStorage.getItem("logs") || "";
  const newLog = `<p><strong>${date}:</strong> ${entry}</p>` + previous;
  localStorage.setItem("logs", newLog);
  document.getElementById("log-history").innerHTML = newLog;
  document.getElementById("log-entry").value = "";
}

document.getElementById("toggle-dark").onclick = function () {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};
