const domain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://api.careerjumpapp.com/authentication/";
const api = "admin/users/";

function fetchCandidates() {
  return fetch(domain + api + "candidates", {
    method: "GET",
    credentials: "include",
  });
}

function fetchCompanies() {
  return fetch(domain + api + "companies", {
    method: "GET",
    credentials: "include",
  });
}

function updUser(id, updatedUser) {
  return fetch(domain + api + id, {
    method: "PUT",
    body: JSON.stringify(updatedUser),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

function delUser(id) {
  return fetch(domain + api + id, {
    method: "DELETE",
    credentials: "include",
  });
}

function setAnsweredQuestionnaire(username) {
  return fetch(domain + api + "questionnaire/" + username, {
    method: "GET",
    credentials: "include",
  });
}

export {
  fetchCandidates,
  fetchCompanies,
  updUser,
  delUser,
  setAnsweredQuestionnaire,
};
