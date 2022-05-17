import React from "react";
import { EuiText} from "@elastic/eui";
import styles from '../../styles/registration-sucess.module.css'

function RegistrationSucess() {
  return (
    <EuiText>
      <p className={styles.thanks}>Thank you for using the recruitment platform!</p>
      <p>
        Please, wait patiently to receive an e-mail from the job matcher. Be
        sure to keep your profile up to date!
      </p>
    </EuiText>
  );
}

export default RegistrationSucess;
