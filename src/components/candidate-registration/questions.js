import { EuiText, EuiButton, EuiButtonGroup } from "@elastic/eui";
import React, { useState, useEffect } from "react";
import styles from "../../styles/questions-first.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheck,
  faXmark,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

function Questions({ number }) {
  const [sfData, setSfData] = useState({
    id: null,
    title: null,
  });

  const [qData, setQData] = useState([
    {
      id: null,
      content: null,
    },
  ]);

  useEffect(() => {
    const url = "http://localhost:8080/softfactor/" + number;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => setSfData(data));
  },);
  useEffect(() => {
    const urlQ = "http://localhost:8080/question/?softFactorId=" + number;
    const optionsQ = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    fetch(urlQ, optionsQ)
      .then((response) => response.json())
      .then((data) => setQData(data));
  }, []);

  const questions = qData.map((question) => (
    <div>
      <p>
        {question.id}. {question.content}
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
          {
            id: "id4",
            label: (
              <>
                <FontAwesomeIcon icon={faXmark} />
                <FontAwesomeIcon icon={faXmark} />
              </>
            ),
          },
        ]}
      />
    </div>
  ));
  return (
    <div>
      <EuiText>
        <h3>{sfData.title}</h3>
        <div className={styles.questions}>{questions}</div>
      </EuiText>
    </div>
  );
}

export default Questions;
