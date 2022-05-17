const domain = "http://localhost:8080/";

function getSoftFactors() {
  return fetch(domain + "softfactor/", {
    method: "GET",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
    },
  });
}

// function testUser() {
//   return fetch(domain + "api/test/user", {
//     method: "GET",
//     credentials: "include",
//   });
// }

// function testAdmin() {
//   return fetch(domain + "api/test/admin", {
//     method: "GET",
//     credentials: "include",
//   });
// }

export { getSoftFactors };
