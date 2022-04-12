import React, { useState } from "react";
import GeneralInformation from "./general-information";
import QuestionFirst from "./questions-first";
import QuestionSecond from "./questions-second";
import LastQuestion from "./last-question";
import RegistrationSucess from "./registration-sucess";
import styles from "../../styles/registration-form.module.css";
import { EuiButtonIcon, EuiText } from "@elastic/eui";
import { any } from "prop-types";

function RegistrationForm() {
  const [step, setStep] = useState(0);
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
    switch (step) {
      case 0:
        return (
          <GeneralInformation formData={formData} setFormData={setFormData} />
        );
      case 1:
        return <QuestionFirst />;
      case 2:
        return <QuestionSecond />;
      case 3:
        return <LastQuestion />;
      case 4:
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
          aria-label={step === 5 ? "Submit" : "Next"}
          disabled={step == 4}
          onClick={() => {
            if (formData.password != formData.confirmPassword) {
              alert("Password do not match");
            }
            else{
              setStep((currentPage) => currentPage + 1);
              console.log(formData);
            }
          }}
        />
      </div>
    </div>
  );
}

export default RegistrationForm;
