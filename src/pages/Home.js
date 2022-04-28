import React from "react";
import styles from "../styles/candidate-registration.module.css";
import { EuiButton, EuiText } from "@elastic/eui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Home = () => {

  let navigate = useNavigate();

  async function handleClick(event) {
    event.preventDefault();
    navigate("/login", { replace: true });
  }

  async function handleClick2(event) {
    event.preventDefault();
    navigate("/register", { replace: true });
  }

  return (
    <div className={styles.container2}>
      <EuiText
        style={{ gridColumnStart: "1", gridColumnEnd: "3", marginTop: "100px" }}
      >
        <h1
          style={{ textAlign: "center", fontFamily: "Helvetica, sans-serif" }}
        >
          We will help you find a{" "}
          <span style={{ fontWeight: "normal" }}>
            <i>job</i>
          </span>{" "}
          <br /> that matches{" "}
          <span style={{ fontWeight: "normal" }}>
            <i>you</i>
          </span>
          .
        </h1>
      </EuiText>
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
        <h1 style={{ fontFamily: "Helvetica, sans-serif" }}>Login</h1>{" "}
        <EuiButton
          type="submit"
          fill
          className={styles.button}
          color="text"
          minWidth={20}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
        </EuiButton>
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
          Register
        </h1>{" "}
        <EuiButton
          type="submit"
          fill
          className={styles.button}
          color="text"
          minWidth={20}
          onClick={handleClick2}
        >
          <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
        </EuiButton>
      </EuiText>
    </div>
  );
};
export default Home;
