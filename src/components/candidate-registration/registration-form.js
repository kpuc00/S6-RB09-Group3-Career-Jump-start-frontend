import React, { useState } from "react";
import GeneralInformation from "./general-information";
import Questions from "./questions";
import RegistrationSucess from "./registration-sucess";
import styles from "../../styles/registration-form.module.css";
import { EuiButtonIcon, EuiText } from "@elastic/eui";
import { any, number } from "prop-types";

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
  function matchPassword() {
    if (formData.password != formData.confirmPassword) {
      alert("Password do not match");
    }
  }
  const StepDisplay = () => {
    if (step === 0) {
      return (
        <GeneralInformation formData={formData} setFormData={setFormData} />
      );
    } else if (step > 0 && step <= sfstep) {
      return <Questions number={step} />;
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
        <EuiButtonIcon
          type="submit"
          display="base"
          iconType="arrowLeft"
          iconSize="l"
          size="m"
          aria-label="Previous"
          disabled={step == 0}
          onClick={() => {
            setStep((currentPage) => currentPage - 1);
          }}
        />
        <EuiButtonIcon
          type="submit"
          display="base"
          iconType="arrowRight"
          iconSize="l"
          size="m"
          aria-label={step === sfstep+2 ? "Submit" : "Next"}
          disabled={step == sfstep+2}
          onClick={() => {
            if (formData.password != formData.confirmPassword) {
              alert("Password do not match");
            } else {
              setStep((currentPage) => currentPage + 1);
            }
          }}
        />
      </div>
    </div>
  );
}

export default RegistrationForm;
