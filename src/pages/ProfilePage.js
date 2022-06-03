import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EuiText,
  EuiButton,
  EuiPage,
  EuiPageBody,
  EuiTitle,
  EuiCallOut,
  EuiBasicTable,
  EuiSpacer,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
} from "@elastic/eui";
import moment from "moment";
import { selectUser } from "../features/auth/authSlice";
import {
  getSFAnswersByUsername,
  selectAnswers,
  selectAnswersLoading,
  selectError,
  selectQuestionsAnswered,
} from "../features/softfactor/softfactorSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const questionsAnswered = useSelector(selectQuestionsAnswered);

  useEffect(() => {
    if (user.questionnaireAnswered)
      dispatch(getSFAnswersByUsername(user.username));
  }, [dispatch, user.questionnaireAnswered, user.username]);

  const answersLoading = useSelector(selectAnswersLoading);
  const answers = useSelector(selectAnswers);
  const error = useSelector(selectError);

  const columns = [
    {
      field: "question.softFactor.title",
      name: "Soft Factor",
    },
    {
      field: "question.content",
      name: "Question",
    },
    {
      field: "content",
      name: "Answer",
    },
  ];

  return (
    <EuiPage>
      <EuiPageBody component="div">
        <EuiPageContent style={{ maxWidth: "80%", margin: "auto" }}>
          <EuiPageContentHeader style={{ justifyContent: "center" }}>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <EuiText>
                  <h1>
                    Welcome,{" "}
                    {user ? `${user.firstName} ${user.lastName}` : "unknown"}
                  </h1>
                </EuiText>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
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
            </EuiText>
            <EuiSpacer />
            {error && (
              <>
                <EuiCallOut color="danger" iconType="alert" title={error} />
                <EuiSpacer />
              </>
            )}
            {answers && user.questionnaireAnswered && (
              <EuiText>
                <h4>Your answers to the questionnaire: </h4>
                <EuiBasicTable
                  tableCaption="Your answers"
                  items={answers}
                  rowHeader="name"
                  columns={columns}
                  loading={answersLoading}
                />
              </EuiText>
            )}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
export default ProfilePage;
