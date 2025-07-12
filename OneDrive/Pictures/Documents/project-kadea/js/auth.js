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
