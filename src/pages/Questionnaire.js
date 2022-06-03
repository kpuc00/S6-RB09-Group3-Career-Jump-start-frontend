import React, { useEffect, useState } from "react";
import Questions from "../components/candidate-registration/questions";
import styles from "../styles/registration-form.module.css";
import { EuiButton, EuiFormLabel} from "@elastic/eui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { getSF, selectSoftFactors } from "../features/softfactor/softfactorSlice";

function Questionnaire() {
  const [step, setStep] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSF());
  },
  [dispatch])

  const softfactors = useSelector(selectSoftFactors)

  const StepDisplay = () => {
    if (step !== softfactors.length ) {
      return <Questions num={step} />;
    }
  };
  return (
    <div className={styles.formContainer} id="form">
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
          className={step +1 === softfactors.length ? styles.none : styles.button}
          color="text"
          minWidth={20}
          aria-label={step === softfactors.length + 1 ? "Submit" : "Next"}
          disabled={step === softfactors + 1}
          onClick={() => {
            if(step !== softfactors.length)
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
  );
}

export default Questionnaire;
