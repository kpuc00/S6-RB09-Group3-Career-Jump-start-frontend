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
  console.log("pesho");
  return fetch(domain + "auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

function testUser() {
  return fetch(domain + "test/user", {
    method: "GET",
    credentials: "include",
  });
}

function testAdmin() {
  return fetch(domain + "test/admin", {
    method: "GET",
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
export { register, login, logout, testUser, testAdmin };
