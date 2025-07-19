export async function utilisateurConnecter(email, password) {
  const response = await fetch(
    `http://localhost:3000/users?email=${email}&password=${password}`
  );
  const data = await response.json();

  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

// auth.js
export async function getUserByEmail(email) {
  if (!email) return null;
  try {
    const response = await fetch(
      `http://localhost:3000/users?email=${encodeURIComponent(email)}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Erreur fetch user:", error);
    return null;
  }
}
