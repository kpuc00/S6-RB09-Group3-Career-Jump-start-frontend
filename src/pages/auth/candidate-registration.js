import React from "react";
import RegistrationForm from "../../components/candidate-registration/registration-form";
import styles from "../../styles/candidate-registration.module.css";

function CandidateRegistration() {
  return (
      <div className={styles.container}>
        <RegistrationForm />
      </div>
      
  );
}

export default CandidateRegistration;
