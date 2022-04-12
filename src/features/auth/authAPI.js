const domain = "http://localhost:8080/";

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

export { login };
