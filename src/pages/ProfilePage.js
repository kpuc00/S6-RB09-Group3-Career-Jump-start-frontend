import React, {useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {EuiText, EuiButton, EuiPage, EuiTitle, EuiCallOut} from "@elastic/eui";
import {selectUser} from "../features/auth/authSlice";
import {testAdmin, testUser} from "../features/auth/authAPI";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const [userLoaded, setUserLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);

    if (user) setUserLoaded(true);
    console.log(userLoaded);
    // if (!userLoaded ) window.location.replace("/login");
  }, [user, userLoaded]);

  async function submitUser() {
    const request = await testUser();
    console.log(request.status, await request.text());
  }

  async function submitAdmin() {
    const request = await testAdmin();
    console.log(request.status, await request.text());
  }

  function startQuestionnaire(){
    navigate("/questionnaire")
  }

  return (
      <EuiPage>
        <EuiText>
          <EuiTitle><h1>Welcome, {user ? `${user.firstName} ${user.lastName}` : "unknown"}</h1></EuiTitle>
          <EuiCallOut title="To find the right job for you, first we need you to answer our quick questionnaire" color="warning">
            <EuiButton onClick={()=>startQuestionnaire()} href="#" color="warning" justify>
              Start Questionnaire
            </EuiButton>
          </EuiCallOut>
          <h6>Email:</h6>
          <p>{user && user.email}</p>
          <h6>Roles:</h6>
          <p>{user && user.roles}</p>
          <h6>Your answers to the questionnaire: </h6>
          <p>{user && user.questionnaireAnswered ? "Loading..." : "Not answered yet."}</p>
      </EuiText>
</EuiPage>
  );
};
export default ProfilePage;
