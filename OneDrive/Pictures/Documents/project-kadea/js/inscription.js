import { utilisateurConnecter } from "./auth.js";

// selection des éléments du DOM formulaire
const form = document.getElementById("signup-form");
const signupError = document.getElementById("signup-error");

// gestion des dates de naissance
// Sélection des éléments du DOM
const daySelect = document.getElementById("day");
const yearSelect = document.getElementById("year");
const selectIdMonth = document.getElementById("month");

// Remplir le jour
for (let i = 1; i <= 31; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  daySelect.appendChild(option);
}

// Remplir les années (1900 à 2025 ou année actuelle)
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 1900; y--) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  yearSelect.appendChild(option);
}

// remplir les jours en fonction du mois
function remplirJours(mois, annee) {
  const joursDansMois = new Date(annee, mois, 0).getDate();
  daySelect.innerHTML = ""; // Réinitialiser les options de jour

  for (let i = 1; i <= joursDansMois; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }
}

selectIdMonth.addEventListener("change", () => {
  const mois = parseInt(selectIdMonth.value, 10);
  const annee = parseInt(yearSelect.value, 10);
  remplirJours(mois, annee);
});

yearSelect.addEventListener("change", () => {
  const mois = parseInt(selectIdMonth.value, 10);
  const annee = parseInt(yearSelect.value, 10);
  remplirJours(mois, annee);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nom = document.getElementById("name").value;
  const pseudo = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  // Vérification des champs
  if (validerChamps()) {
    const nom = document.getElementById("name").value;
    const pseudo = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;

    fetch(`http://localhost:3000/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          signupError.textContent = "Cet email est déjà utilisé.";
          signupError.style.color = "red";
        } else {
          // Si l'email n'est pas utilisé, on peut procéder à l'inscription

          fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nom,
              username: pseudo,
              email: email,
              password: password,
              birthdate: `${day}-${month}-${year}`,
            }),
          }).then(() => {
            signupError.textContent = "Inscription réussie ✅!";
            signupError.style.color = "green";
            signupError.style.display = "block";

            // Réinitialiser le formulaire

            // Rediriger vers la page de connexion après 5 second
            window.location.href = "./seConnecterEmail.html";

            form.reset();
          });
        }
      });
  } else {
    signupError.textContent =
      "Veuillez corriger les erreurs dans le formulaire. ❌";
    signupError.style.color = "red ";
  }
});

function validerChamps() {
  const nom = document.getElementById("name").value;
  const pseudo = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!regexEmail.test(email)) {
    signupError.textContent = "Veuillez entrer un email valide.";
    return false;
  }
  if (!regexPassword.test(password)) {
    signupError.textContent =
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
    signupError.style.color = "red ❌";
    return false;
  }

  if (!nom || !pseudo || !email || !password) {
    signupError.textContent = "Veuillez remplir tous les champs.";
    signupError.style.color = "red ❌";
    return false;
  }

  return true;
}
