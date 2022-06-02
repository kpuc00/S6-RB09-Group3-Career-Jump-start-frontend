import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  EuiText,
  EuiButton,
  EuiPage,
  EuiPageBody,
  EuiTitle,
  EuiCallOut,
  EuiSpacer,
} from "@elastic/eui";
import moment from "moment";
import { selectUser } from "../features/auth/authSlice";
import { selectQuestionsAnswered } from "../features/softfactor/softfactorSlice";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const questionsAnswered = useSelector(selectQuestionsAnswered);

  return (
    <EuiPage>
      <EuiPageBody>
        <EuiText textAlign="center">
          <EuiTitle>
            <h1>
              Welcome, {user ? `${user.firstName} ${user.lastName}` : "unknown"}
            </h1>
          </EuiTitle>
        </EuiText>
        <EuiText>
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
          {questionsAnswered && (
            <EuiCallOut
              title="Answers submitted successfully!"
              color="success"
            ></EuiCallOut>
          )}
          <h3>Details:</h3>
          <ul>
            <li>
              <strong>Email: </strong>
              {user && user.email}
            </li>
            <li>
              <strong>Phone: </strong>
              {user && user.phoneNumber}
            </li>
            <li>
              <strong>Date of birth: </strong>
              {user && moment(user.dob).format("D.MM.YYYY")}
            </li>
            <li>
              <strong>Roles: </strong>
              {user && user.roles}
            </li>
          </ul>
          <h4>Your answers to the questionnaire: </h4>
        </EuiText>
        {user && user.questionnaireAnswered
          ? "Loading..."
          : "Not answered yet."}
      </EuiPageBody>
    </EuiPage>
  );
};
export default ProfilePage;
