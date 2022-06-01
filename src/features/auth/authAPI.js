const domain = "http://localhost:4200/";

function login(email, password) {
  return fetch(domain + "api/auth/signin", {
    method: "POST",
    body: JSON.stringify({ username: email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

function logout() {
  console.log("pesho");
  return fetch(domain + "api/auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

function testUser() {
  return fetch(domain + "api/test/user", {
    method: "GET",
    credentials: "include",
  });
}

function testAdmin() {
  return fetch(domain + "api/test/admin", {
    method: "GET",
    credentials: "include",
  });
}

function register(email, username, password, role, firstName, lastName, phoneNumber, startDate) {
  return fetch(domain + "api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, username, password, role, firstName, lastName, phoneNumber, startDate }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export { register, login, logout, testUser, testAdmin };
