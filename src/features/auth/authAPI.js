const domain = "http://localhost:8080/";

function login(username, password) {
  return fetch(domain + "auth/signin", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

function logout() {
  return fetch(domain + "auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

function register(
  username,
  firstName,
  lastName,
  phoneNumber,
  dob,
  email,
  password,
  role
) {
  return fetch(domain + "auth/signup", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      phoneNumber,
      dob,
      email,
      password,
      role,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export { register, login, logout };
