const domain = "http://localhost:8081/admin";

function getSoftFactors() {
  return fetch(domain + "/softfactor", {
    method: "GET",
  });
}

function updateSoftFactor(id, sf) {
  //console.log(JSON.stringify({sf}));
  return fetch(domain + "/softfactor/" + id, {
    method: "PUT",
    body: JSON.stringify(sf),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

function getQuestionsBySoftFactorId(id){
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

function postSF(softFactor) {
  return fetch(domain + "/softfactor", {
    method: "POST",
    body: JSON.stringify(softFactor),
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

function deleteSFAPI(id) {
  return fetch(domain + "/softfactor" + `/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}

function updateQuestionAPI(id, question){
  console.log("id", id);
  console.log("passed question", JSON.stringify(question));
  return fetch(domain + "/question/" + id, {
    method: "PUT",
    body: JSON.stringify(question),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

function postQuestionAPI(question) {
  return fetch(domain + "/question", {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}
export { getSoftFactors, getQuestionsBySoftFactorId, postAnswer, updateSoftFactor, postSF, deleteSFAPI, updateQuestionAPI, postQuestionAPI, getAnswersbyUsername };
