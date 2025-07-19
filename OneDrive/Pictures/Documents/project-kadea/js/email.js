import { utilisateurConnecter } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEmailOrPhone");
  const input = document.getElementById("emailOrPhone");
  const messageError = document.getElementById("signup-error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value.trim();

    // Vérifie si email ou numéro valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{8,14}$/;

    if (emailRegex.test(value) || phoneRegex.test(value)) {
      // ✅ Stocker dans localStorage
      localStorage.setItem("emailSoumis", value);

      // Rediriger vers la page du mot de passe
      window.location.href = "./seConnecterPassword.html";
    } else {
      // ❌ Affiche une erreur
      messageError.textContent =
        "Veuillez entrer un email ou un numéro de téléphone valide. ❌";
      messageError.style.color = "red";
      input.classList.add("border-red-500");

      setTimeout(() => {
        input.classList.add("border-red-500");
      }, 3000);
    }
  });
});
