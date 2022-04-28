import React from "react";
import GeneralInformation from "../../components/candidate-registration/general-information";
import styles from "../../styles/candidate-registration.module.css";

function CandidateRegistration() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.header}><h1>Candidate Registration</h1></div> */}
      <GeneralInformation />

    </div>
  );
}

export default CandidateRegistration;
