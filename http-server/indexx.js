
let users = [];

function displayUsers() {
  let html = "";
  users.forEach((user) => {
    if (user.name && user.email && user.password && user.dob && user.terms) {
      html += "<tr>";
      html += `<td>${user.name}</td>`;
      html += `<td>${user.email}</td>`;
      html += `<td>${user.password}</td>`;
      html += `<td>${user.dob}</td>`;
      html += `<td>${user.terms}</td>`;
      html += "</tr>";
    }
  });
  console.log(html);
  document.querySelector("#userTableBody").innerHTML = html;
}

function calcAge(date) {
  const dob = new Date(date);
  const diff = Date.now() - dob.getTime();
  const age = new Date(diff);
  return Math.abs(age.getUTCFullYear() - 1970);
}

function handleSubmit(event) {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const dob = document.querySelector("#dob").value;
  const terms = document.querySelector("#terms").checked;
  const age = calcAge(dob);

  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address format.");
    return;
  }

  users.push({ name, email, password, dob, terms: terms ? "true" : "false" });

  console.log(users);
  localStorage.setItem("users", JSON.stringify(users));
  document.querySelector("#registrationForm").reset();
  displayUsers();
}

document.addEventListener("DOMContentLoaded", () => {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
    displayUsers();
  }
});

document.querySelector("#registrationForm").addEventListener("submit", handleSubmit);

document.querySelector("#clearTableBtn").addEventListener("click", () => {
  users = [];
  localStorage.removeItem("users");
  displayUsers();
});
