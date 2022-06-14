import React from "react";
import styles from "../../styles/candidate-registration.module.css";
import { EuiButton, EuiText } from "@elastic/eui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={styles.container2}>
      <hr
        style={{
          width: "50%",
          transform: "rotate(90deg)",
          gridColumnStart: "1",
          gridColumnEnd: "3",
          gridRowStart: "2",
          border: "1px solid",
          maxWidth: "450px",
        }}
      />
      <EuiText
        style={{ gridColumnStart: "1", gridColumnEnd: "2", gridRowStart: "2" }}
      >
        <h1 style={{ fontFamily: "Helvetica, sans-serif" }}>Candidate</h1>{" "}
        <Link to="/candidate">
          <EuiButton
            type="submit"
            fill
            className={styles.button}
            color="text"
            minWidth={20}
            id="register-candidate-button"
          >
            <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
          </EuiButton>
        </Link>
      </EuiText>{" "}
      <EuiText
        style={{
          gridColumnStart: "2",
          gridColumnEnd: "3",
          gridRowStart: "2",
        }}
      >
        <h1
          style={{
            fontFamily: "Helvetica, sans-serif",
          }}
        >
          Company
        </h1>{" "}
        <Link to="#">
          <EuiButton
            type="submit"
            fill
            className={styles.button}
            color="text"
            minWidth={20}
          >
            <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
          </EuiButton>
        </Link>
      </EuiText>
    </div>
  );
};
export default Register;
