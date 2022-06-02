import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  EuiText,
  EuiButton,
  EuiPage,
  EuiTitle,
  EuiCallOut,
} from "@elastic/eui";
import { selectUser } from "../features/auth/authSlice";

const ProfilePage = () => {
  const user = useSelector(selectUser);

  return (
    <EuiPage>
      <EuiText>
        <EuiTitle>
          <h1>
            Welcome, {user ? `${user.firstName} ${user.lastName}` : "unknown"}
          </h1>
        </EuiTitle>
        {user && user.questionnaireAnswered === false && (
          <EuiCallOut
            title="To find the right job for you, first we need you to fill our questionnaire!"
            color="warning"
          >
            <Link to="/questionnaire">
              <EuiButton color="warning">Start Questionnaire</EuiButton>
            </Link>
          </EuiCallOut>
        )}
        <h6>Email:</h6>
        <p>{user && user.email}</p>
        <h6>Roles:</h6>
        <p>{user && user.roles}</p>
        <h6>Your answers to the questionnaire: </h6>
        <p>
          {user && user.questionnaireAnswered
            ? "Loading..."
            : "Not answered yet."}
        </p>
      </EuiText>
    </EuiPage>
  );
};
export default ProfilePage;
