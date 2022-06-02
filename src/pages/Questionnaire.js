import React, { useEffect, useState } from "react";
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
import {
  getSF,
  selectQuestionsAnswered,
  selectSoftFactors,
} from "../features/softfactor/softfactorSlice";

function Questionnaire() {
  const [step, setStep] = useState(0);

  const dispatch = useDispatch();

  const softfactors = useSelector(selectSoftFactors);
  let questionsAnswered = useSelector(selectQuestionsAnswered);
  //let questions = useSelector(selectQuestions);

  useEffect(() => {
    dispatch(getSF());
    //console.log("Questions length", questions.length);
    // if (questionsAnswered === questions.length) {
    //   console.log("Razmera e ednakuv");
    // }
  }, [dispatch, questionsAnswered]);

  const StepDisplay = () => {
    if (step !== softfactors.length) {
      return <Questions num={step} />;
    }
  };
  return (
    <EuiPage style={{ justifyContent: "center" }}>
      <div className={styles.formContainer} id="form">
        <EuiCallOut title="Answers submitted successfully!" color="success">
          <EuiSpacer />
          <EuiButton href="#" color="success" justify>
            Go to profile
          </EuiButton>
        </EuiCallOut>
        <EuiSpacer />
        {true && (
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
        )}
      </div>
    </EuiPage>
  );
}

export default Questionnaire;
