import React, { useState } from "react";
import GeneralInformation from "./general-information";
import Questions from "./questions";
import RegistrationSucess from "./registration-sucess";
import styles from "../../styles/registration-form.module.css";
import { EuiButton, EuiFormLabel, EuiText } from "@elastic/eui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { any } from "prop-types";

function RegistrationForm() {
  const [step, setStep] = useState(0);
  const [sfstep, setSfState] = useState(0);

  const url = "http://localhost:8080/softfactor/";
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      setSfState((sfstep) => (sfstep = data.length));
    });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: any,
    password: "",
    confirmPassword: "",
  });
  const StepDisplay = () => {
    if (step === 0) {
      return (
        <GeneralInformation formData={formData} setFormData={setFormData} />
      );
    } else if (step > 0 && step <= sfstep) {
      return <Questions />;
    } else {
      return <RegistrationSucess />;
    }
  };
  return (
    <div className={styles.formContainer} id="form">
      <div>
        <EuiText>
          <h1 className={styles.header}>Candidate Registration</h1>
        </EuiText>
      </div>
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
          className={styles.button}
          color="text"
          minWidth={20}
          aria-label={step === sfstep + 2 ? "Submit" : "Next"}
          disabled={step === sfstep + 2}
          onClick={() => {
            if (formData.password !== formData.confirmPassword) {
              alert("Password do not match");
            } else {
              setStep((currentPage) => currentPage + 1);
            }
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
        </EuiButton>
      </div>
      <EuiFormLabel>
        Step {step + 1}/{sfstep + 2}
      </EuiFormLabel>
    </div>
  );
}

export default {RegistrationForm};
