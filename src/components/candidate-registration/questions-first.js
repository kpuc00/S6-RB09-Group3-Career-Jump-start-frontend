import { EuiText, EuiButton, EuiButtonGroup } from "@elastic/eui";
import React from "react";
import styles from "../../styles/questions-first.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheck,
  faXmark,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

function QuestionsFirst() {
  return (
    <div>
      <EuiText>
        <h3>Safe Atmosphere</h3>
        <div className={styles.questions}>
          <p>
            1. I am searching for a workplace with a non-judging environment.
          </p>
          <EuiButtonGroup
            legend="Legend is required"
            buttonSize="m"
            isFullWidth
            options={[
              { id: "id0", label: <FontAwesomeIcon icon={faCheckDouble} /> },
              { id: "id1", label: <FontAwesomeIcon icon={faCheck} /> },
              { id: "id2", label: <FontAwesomeIcon icon={faMinus} /> },
              { id: "id3", label: <FontAwesomeIcon icon={faXmark} /> },
              { id: "id4", label: <><FontAwesomeIcon icon={faXmark} /><FontAwesomeIcon icon={faXmark} /></>},
            ]}
          />
          <p>2. I prefer working in a team.</p>
          <p>3. I prefer working alone.</p>
        </div>
        <h3>Full Employeeship</h3>
        <div className={styles.questions}>
          <p>1. I want to feel accepted from other colleagues.</p>
          <p>2. I prefer a “feel at home” company environment.</p>
          <p>3. I prefer a corporate company environment.</p>
        </div>
      </EuiText>
    </div>
  );
}

export default QuestionsFirst;
