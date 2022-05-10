const domain = "http://localhost:8080/";
const api = "api/admin/users";

function fetchCompanies() {
  return fetch(domain + api + "/companies", {
    method: "GET",
    credentials: "include",
  });
}

export { fetchCompanies };
