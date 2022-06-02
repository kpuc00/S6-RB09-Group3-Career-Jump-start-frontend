import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import Questions from "../components/candidate-registration/questions";
import styles from "../styles/registration-form.module.css";
import {
  EuiButton,
  EuiCallOut,
  EuiFormLabel,
  EuiPage,
  EuiSpacer,
} from "@elastic/eui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getSF,
  selectError,
  selectQuestionsAnswered,
  selectSoftFactors,
} from "../features/softfactor/softfactorSlice";
import { selectUser, updateUser } from "../features/auth/authSlice";
import {
  selectQuestionnaireAnsweredSet,
  setQuestionnaireAnswered,
} from "../features/user/userSlice";

function Questionnaire() {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const softfactors = useSelector(selectSoftFactors);
  const questionsAnswered = useSelector(selectQuestionsAnswered);
  const questionnaireAnsweredSet = useSelector(selectQuestionnaireAnsweredSet);
  const error = useSelector(selectError);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getSF());
    console.log("Question answered", questionsAnswered);
    if (questionsAnswered === true)
      dispatch(setQuestionnaireAnswered(user.username));
    if (questionnaireAnsweredSet === true) {
      const userCookie = cookie.load("user");
      const updatedUser = {
        ...userCookie,
        questionnaireAnswered: true,
      };
      cookie.save("user", updatedUser, {
        path: "/",
        maxAge: 24 * 60 * 60,
      });
      dispatch(updateUser(updatedUser));
    }
  }, [dispatch, questionnaireAnsweredSet, questionsAnswered, user.username]);

  const StepDisplay = () => {
    if (step !== softfactors.length) {
      return <Questions num={step} />;
    }
  };
  return (
    <EuiPage style={{ justifyContent: "center" }}>
      <div className={styles.formContainer} id="form">
        {error && <EuiCallOut title={error} color="danger" />}
        <EuiSpacer />
        <div>
          <div className={styles.body}>{StepDisplay()}</div>
          <div className={styles.footer}>
            <EuiButton
              display="base"
              aria-label="Previous"
              fill
              color="text"
              className={step === 0 ? styles.none : styles.button}
              minWidth={20}
              disabled={step === 0}
              onClick={() => {
                setStep((currentPage) => currentPage - 1);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
            </EuiButton>
            <EuiButton
              type="submit"
              fill
              className={
                step + 1 === softfactors.length ? styles.none : styles.button
              }
              color="text"
              minWidth={20}
              aria-label={step === softfactors.length + 1 ? "Submit" : "Next"}
              disabled={step === softfactors + 1}
              onClick={() => {
                if (step !== softfactors.length)
                  setStep((currentPage) => currentPage + 1);
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
            </EuiButton>
          </div>
          <EuiFormLabel>
            Step {step + 1}/{softfactors.length}
          </EuiFormLabel>
        </div>
      </div>
    </EuiPage>
  );
}

export default Questionnaire;
