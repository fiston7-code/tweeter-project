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
  const password = input.value.trim();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = await utilisateurConnecter(email, password);
    if (user) {
      localStorage.setItem("utilisateurActif", JSON.stringify(user));
      alert("connexion Réussie !✅");
      window.location.href = "./acceuille.html";
    } else {
      alert("Mot de passe incorrect ❌");
      input.classList.add(border - red - 500);
      setTimeout(() => input.classList.remove("border-red-500"), 3000);
    }
  });
});

/*
  const formPass = document.getElementById("formPassword");
  const email = localStorage.getItem("emailEnCours");
  formPass.addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = formPass.password.value;
    const utilisateur = await utilisateurConnecter(email, password);

    if (utilisateur) {
      alert("Connexion réussie !");
      sessionStorage.setItem("utilisateurConnecte", JSON.stringify(utilisateur));
      window.location.href = "index.html";
    } else {
      alert("Email ou mot de passe incorrect");
    }
  });
  */
