const domain = "http://localhost:8080/admin";

function getSoftFactors() {
  return fetch(domain + "/softfactor", {
    method: "GET",
  });
}

function getQuestionsBySoftFactorId(id){
  return fetch(domain + "/question/?softFactorId=" + id, {
    method: "GET",
  })
}

function postAnswer(content, question){
  return fetch(domain + "/answers", {
    method: "POST",
    body: JSON.stringify({content, question}),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export { getSoftFactors, getQuestionsBySoftFactorId, postAnswer };
