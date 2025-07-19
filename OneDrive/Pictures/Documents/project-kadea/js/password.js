import { utilisateurConnecter } from "./auth.js";

addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("emailSoumis");

  if (!email) {
    alert("Email manquant; veuillez revenir sur la page précedente");
    window.location.href = "./seConnecterEmail.html";
    return;
  }
  const form = document.getElementById("formPassword");
  const input = document.getElementById("password");
  const signupError = document.getElementById("signup-error");
  const password = input.value.trim();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = await utilisateurConnecter(email, password);
    if (user) {
      localStorage.setItem("utilisateurActif", JSON.stringify(user));
      signupError.textContent = "Connexion réussie ✅!";
      signupError.style.color = "green";
      signupError.style.display = "font-weight: bold;";
      setTimeout(() => {
        window.location.href = "./acceuille.html";
      }, 5000);
    } else {
      signupError.textContent = "Mot de passe incorrect ❌";
      signupError.style.color = "red";
      signupError.style.display = "font-weight: bold;";
      input.classList.add("border-red-500");
      setTimeout(() => input.classList.remove("border-red-500"), 3000);
    }
  });
});
