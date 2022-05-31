import React from "react";
import RegistrationForm from "../../components/candidate-registration/registration-form";
import styles from "../../styles/candidate-registration.module.css";

function CandidateRegistration() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.header}><h1>Candidate Registration</h1></div> */}
      <RegistrationForm />

    </div>
  );
}

export default CandidateRegistration;
