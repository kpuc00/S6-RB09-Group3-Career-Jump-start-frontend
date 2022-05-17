import {
  EuiText,
  EuiKeyPadMenu,
  EuiFlexGroup,
  EuiKeyPadMenuItem,
} from "@elastic/eui";
import React, { useState, useEffect } from "react";
import styles from "../../styles/questions-first.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheck,
  faXmark,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

function Questions() {
  const [isLoaded, setisLoaded] = useState(false);
  // const [num, setNum] = useState(0);
  const [sfData, setSfData] = useState([
    {
      id: null,
      title: null,
    },
  ]);
  const [qData, setQData] = useState([
    {
      id: null,
      content: null,
    },
  ]);

  useEffect(() => {
    const url = "http://localhost:8080/softfactor/";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    if (!isLoaded) {
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          let ids = [];
          data.map((element) => {
            ids.push(element);
          });
          setSfData(ids);
          setisLoaded(true);
        });
    }
  });

  // useEffect(() => {
  //   const urlQ = "http://localhost:8080/question/?softFactorId=" + sfData[0].id;
  //   const optionsQ = {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json;charset=UTF-8",
  //     },
  //   };
  //   fetch(urlQ, optionsQ)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setQData(data);
  //       console.log(data);
  //     });
  // }, []);

  const questions = qData.map((question) => (
    <div key={question.id}>
      <p>
        {question.id}. {question.content}
      </p>
      <EuiFlexGroup>
        <EuiKeyPadMenu
          checkable={{ ariaLegend: "Single select as radios" }}
          style={{ display: "contents" }}
        >
          {/* <EuiFlexItem> */}
          <EuiKeyPadMenuItem
            checkable="single"
            name="test1"
            id="1"
            label="Strongly Agree"
          >
            <FontAwesomeIcon icon={faCheckDouble} />
          </EuiKeyPadMenuItem>
          {/* </EuiFlexItem>
          <EuiFlexItem> */}
          <EuiKeyPadMenuItem
            checkable="single"
            name="test"
            id="2"
            label="Agree"
          >
            <FontAwesomeIcon icon={faCheck} />
          </EuiKeyPadMenuItem>
          {/* </EuiFlexItem>
          <EuiFlexItem> */}
          <EuiKeyPadMenuItem
            checkable="single"
            name="test1"
            id="1"
            label="No prefference"
          >
            <FontAwesomeIcon icon={faMinus} />
          </EuiKeyPadMenuItem>
          {/* </EuiFlexItem>
          <EuiFlexItem> */}
          <EuiKeyPadMenuItem
            checkable="single"
            name="test1"
            id="1"
            label="Disagree"
          >
            <FontAwesomeIcon icon={faXmark} />
          </EuiKeyPadMenuItem>
          {/* </EuiFlexItem>
          <EuiFlexItem> */}
          <EuiKeyPadMenuItem
            checkable="single"
            name="test1"
            id="1"
            label="Strongly Disagree"
          >
            <FontAwesomeIcon icon={faXmark} />
            <FontAwesomeIcon icon={faXmark} />
          </EuiKeyPadMenuItem>
          {/* </EuiFlexItem> */}
        </EuiKeyPadMenu>
      </EuiFlexGroup>
    </div>
  ));
  return (
    <div>
      <EuiText>
        <h3>{sfData[0].title}</h3>
        <div className={styles.questions}>{questions}</div>
      </EuiText>
    </div>
  );
}

export default Questions;
