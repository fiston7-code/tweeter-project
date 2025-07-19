import { getUserByEmail } from "./auth.js";
const localEmail = localStorage.getItem("emailSoumis");
if (!localEmail) {
  window.location.href = "./seConnecterEmail.html";
}
const nomProfil = document.querySelector(".profil-nom");
const nom = document.getElementById("nom-profil");
const pseudo = document.getElementById("pseudo-profil");
const email = document.getElementById("email-profil");
const bio = document.getElementById("bio-profil");
const avatar = document.getElementById("avatar");
const banner = document.getElementById("banner");
const locationProfil = document.getElementById("location-profil");
const webSiteProfil = document.getElementById("website-profil");
const created = document.getElementById("createdAt-profil");
const following = document.getElementById("following-profil");
const followers = document.getElementById("followers-profil");

const nomSidebar = document.getElementById("sidebar-nom");
const pseudoSidebar = document.getElementById("sidebar-pseudo");

getUserByEmail(localEmail).then((user) => {
  if (!user) return;

  nom.textContent = user.name;
  nomProfil.textContent = user.name;
  pseudo.textContent = "@" + user.username;
  email.textContent = user.email;
  bio.textContent = user.bio;
  locationProfil.textContent = user.location;
  webSiteProfil.textContent = user.website;
  created.textContent = new Date(user.createdAt).toLocaleDateString();
  followers.textContent = user.followers;
  following.textContent = user.following;

  if (avatar) avatar.src = user.profilePicture;
  if (banner) banner.src = user.coverPicture;

  if (nomSidebar) nomSidebar.textContent = user.name;
  if (pseudoSidebar) pseudoSidebar.textContent = "@" + user.username;

  locationProfil.innerHTML = `<i class="fa-solid fa-location-dot mr-1 text-gray-500"></i> ${user.location}`;
  webSiteProfil.innerHTML = `<i class="fa-solid fa-globe mr-1 text-gray-500"></i> visiter le site <a href="${user.website}" target="_blank" class="text-blue-500 hover:underline">${user.website}</a>`;
  email.innerHTML = `<i class="fa-solid fa-envelope" mr-1 text-gray-500"></i> mon email <a href="${user.email}" target="_blank" class="text-blue-500 hover:underline">${user.email}</a>`;
  created.innerHTML = `<i class="fa-solid fa-calendar-days" mr-1 text-gray-500"></i> A rejoint X le ${new Date(
    user.createdAt
  ).toLocaleDateString()}`;
  bio.innerHTML = `<i class="fa-solid fa-user-pen mr-1 text-gray-500"></i> ${user.bio}`;
  followers.innerHTML = `<i class="fa-solid fa-users mr-1 text-gray-500"></i> <span class="text-white">${user.followers}</span> abonnés`;
  following.innerHTML = `<i class="fa-solid fa-users mr-1 text-gray-500"></i> <span class="text-white">${user.following}</span> abonnements`;

  chargerTweets(user.email);
});

function chargerTweets(email) {
  fetch("http://localhost:3000/tweets")
    .then((response) => response.json())
    .then((tweets) => {
      const conteneurTweets = document.getElementById("user-tweets");
      conteneurTweets.innerHTML = "";

      // 🔽 Filtrer les tweets de l'utilisateur
      const userTweets = tweets.filter(
        (tweet) => tweet.auteur && tweet.auteur.includes(email.split("@")[0])
      );

      userTweets.reverse().forEach((tweet) => {
        const tweetDiv = document.createElement("div");
        tweetDiv.classList.add("mb-6", "p-4", "border-b", "border-gray-700");

        const headerDiv = document.createElement("div");
        headerDiv.classList.add(
          "flex",
          "items-center",
          "gap-2",
          "text-sm",
          "text-gray-400"
        );

        const img = document.createElement("img");
        img.src =
          tweet.avatar ||
          "https://t4.ftcdn.net/jpg/03/74/64/51/240_F_374645192_A1auR4EmLbz1JixGQKOSpHb2JAH3H7hH.jpg";
        img.alt = "Avatar";
        img.classList.add("w-10", "h-10", "rounded-full");

        const pseudo = document.createElement("span");
        pseudo.textContent = tweet.pseudo;

        const date = document.createElement("span");
        date.textContent = tweet.date;

        const nom = document.createElement("span");
        nom.textContent = tweet.auteur;
        nom.classList.add("font-bold", "text-white");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add(
          "text-red-500",
          "p-1",
          "hover:text-red-700",
          "rounded-full",
          "ml-auto"
        );
        deleteBtn.innerHTML = `<i class="fa-solid fa-ellipsis"></i>`;
        deleteBtn.addEventListener("click", () => {
          fetch(`http://localhost:3000/tweets/${tweet.id}`, {
            method: "DELETE",
          }).then(() => {
            chargerTweets(email); // on recharge avec le bon filtre
          });
        });

        headerDiv.appendChild(img);
        headerDiv.appendChild(nom);
        headerDiv.appendChild(pseudo);
        headerDiv.appendChild(date);
        headerDiv.appendChild(deleteBtn);

        const textTweet = document.createElement("p");
        textTweet.textContent = tweet.contenu;
        textTweet.classList.add("text-white", "mt-2");

        tweetDiv.appendChild(headerDiv);
        tweetDiv.appendChild(textTweet);

        // Interactions du tweet avec les boutons like et retweet

        const interactionDiv = document.createElement("div");
        interactionDiv.classList.add(
          "flex",
          "items-center",
          "m-auto",
          "gap-8",
          "mb-8"
        );
        const interactionBtnLike = document.createElement("div");
        const interactionBtnRetweet = document.createElement("div");
        const likesBtn = document.createElement("button");
        const spanLikes = document.createElement("span");
        const retweetBtn = document.createElement("button");
        const spanRetweets = document.createElement("span");
        likesBtn.classList.add(
          "p-1",
          "active:text-red-500",
          "text-lg",
          "text-gray-500"
        );
        likesBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        spanLikes.textContent = tweet.likes;
        retweetBtn.classList.add(
          "text-gray-500",
          "p-1",
          "text-lg",
          "active:text-green-500"
        );
        retweetBtn.innerHTML = `<i class="fa-solid fa-retweet"></i>`;
        spanRetweets.textContent = tweet.retweets;
        likesBtn.addEventListener("click", () => {
          tweet.likes += 1; // Incrémente le nombre de likes localement
          spanLikes.textContent = tweet.likes; // Met à jour l'affichage des likes
          fetch(`http://localhost:3000/tweets/${tweet.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              likes: tweet.likes,
              retweets: tweet.retweets,
            }),
          });
        });

        retweetBtn.addEventListener("click", () => {
          tweet.retweets += 1;
          spanRetweets.textContent = tweet.retweets;
          // Incrémente le nombre de likes localement
          spanRetweets.textContent = tweet.likes;
          fetch(`http://localhost:3000/tweets/${tweet.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              retweets: tweet.retweets,
            }),
          });
        });
        interactionDiv.appendChild(interactionBtnLike);
        interactionDiv.appendChild(interactionBtnRetweet);
        interactionBtnLike.appendChild(likesBtn);
        interactionBtnLike.appendChild(spanLikes);
        interactionBtnRetweet.appendChild(retweetBtn);
        interactionBtnRetweet.appendChild(spanRetweets);
        tweetDiv.appendChild(interactionDiv);

        conteneurTweets.appendChild(tweetDiv);
      });
    });
}
