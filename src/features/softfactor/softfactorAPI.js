const domain = "http://localhost:8081/admin";

function getSoftFactors() {
  return fetch(domain + "/softfactor", {
    method: "GET",
  });
}

function getQuestionsBySoftFactorId(id) {
  return fetch(domain + "/question/?softFactorId=" + id, {
    method: "GET",
  });
}

function postAnswer(answers) {
  return fetch(domain + "/answers", {
    method: "POST",
    body: JSON.stringify(answers),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

function getAnswersbyUsername(username) {
  return fetch(domain + "/answers?username=" + username, {
    method: "GET",
    credentials: "include",
  });
}

export {
  getSoftFactors,
  getQuestionsBySoftFactorId,
  postAnswer,
  getAnswersbyUsername,
};
