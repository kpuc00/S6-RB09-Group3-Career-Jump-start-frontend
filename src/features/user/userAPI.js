const domain = "http://localhost:8080/";
const api = "api/admin/users";

function fetchCandidates() {
  return fetch(domain + api + "/candidates", {
    method: "GET",
    credentials: "include",
  });
}

function fetchCompanies() {
  return fetch(domain + api + "/companies", {
    method: "GET",
    credentials: "include",
  });
}

function updUser(id, username, firstName, lastName, phoneNumber, email) {
  return fetch(domain + api + `/${id}`, {
    method: "UPDATE",
    body: JSON.stringify({ username, firstName, lastName, phoneNumber, email }),
    credentials: "include",
  });
}

function delUser(id) {
  return fetch(domain + api + `/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export { fetchCandidates, fetchCompanies, updUser, delUser };
