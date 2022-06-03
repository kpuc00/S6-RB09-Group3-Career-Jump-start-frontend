import {
  EuiText,
  EuiKeyPadMenuItem,
  useGeneratedHtmlId,
  EuiButton,
  EuiTextArea,
  EuiSpacer
} from "@elastic/eui";
import React, { useState, useEffect } from "react";
import styles from "../../styles/questions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheck,
  faXmark,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionsBySFId,
  getSF,
  selectQuestions,
  selectSoftFactors,
  answerPost,
  selectMessage,
} from "../../features/softfactor/softfactorSlice";

function Questions(props) {
  const { num } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSF());
  }, [dispatch]);

  const softfactors = useSelector(selectSoftFactors);

  useEffect(() => {
    const id = softfactors[num].id;
    dispatch(getQuestionsBySFId({ id }));
  }, [dispatch, num, softfactors]);

  const questions = useSelector(selectQuestions);
  const message = useSelector(selectMessage);

  let questionnaire;

  const radioGroupName = useGeneratedHtmlId({ prefix: "radioGroup" });

  const keypadRadioButtonId__1 = "Strongly Agree";
  const keypadRadioButtonId__2 = "Agree";
  const keypadRadioButtonId__3 = "No prefference";
  const keypadRadioButtonId__4 = "Disagree";
  const keypadRadioButtonId__5 = "Strongly Disagree";

  const [singleSelectedID, setSingleSelectedID] = useState([]);

  const addChoice = (button, id) => {
    let obj = { button: button, question: id };
    const test = singleSelectedID.some((e) => e.question.id == id.id); // Need double equals otherwise it doesn't work (this is for all lines with that warning)
    if (!test) {
      let arr = singleSelectedID.concat(obj);
      setSingleSelectedID(arr);
    } else {
      let index = singleSelectedID.findIndex((e) => e.question.id == id.id);
      let arr = (singleSelectedID.splice(index, 1), singleSelectedID);
      let arr2 = arr.concat(obj);
      setSingleSelectedID(arr2);
    }
  };

  function addAnswers() {
    let answers = [];
    singleSelectedID.forEach((answer) => {
      const content = answer.button.replace(answer.question.id, "");
      const question = answer.question;
      answers.push({ content, question });
    });
    dispatch(answerPost({ answers }));
  }

  console.log(singleSelectedID);
  let tbl;
  if (questions !== null) {
    questionnaire = questions.map((question) => {
      if (question.type === "CLOSED") {
        return (
          <tr key={question.id} className={styles.table}>
            <td className={styles.table}>{question.content}</td>
            <td className={styles.table}>
              <EuiKeyPadMenuItem
                checkable="single"
                name={radioGroupName + question.id}
                id={keypadRadioButtonId__5 + question.id}
                label=""
                onChange={(id) => {
                  addChoice(id, question);
                }}
                isSelected={singleSelectedID.some(
                  (e) => e.button === keypadRadioButtonId__5 + question.id
                )}
              >
                <FontAwesomeIcon
                  style={{ marginRight: 2 }}
                  icon={faXmark}
                  size="3x"
                />
                <FontAwesomeIcon icon={faXmark} size="3x" />
              </EuiKeyPadMenuItem>
            </td>
            <td className={styles.table}>
              {" "}
              <EuiKeyPadMenuItem
                checkable="single"
                name={radioGroupName + question.id}
                id={keypadRadioButtonId__4 + question.id}
                label=""
                onChange={(id) => {
                  addChoice(id, question);
                }}
                isSelected={singleSelectedID.some(
                  (e) => e.button === keypadRadioButtonId__4 + question.id
                )}
              >
                <FontAwesomeIcon icon={faXmark} size="3x" />
              </EuiKeyPadMenuItem>
            </td>
            <td className={styles.table}>
              <EuiKeyPadMenuItem
                checkable="single"
                name={radioGroupName + question.id}
                id={keypadRadioButtonId__3 + question.id}
                label=""
                onChange={(id) => {
                  addChoice(id, question);
                }}
                isSelected={singleSelectedID.some(
                  (e) => e.button === keypadRadioButtonId__3 + question.id
                )}
              >
                <FontAwesomeIcon icon={faMinus} size="3x" />
              </EuiKeyPadMenuItem>
            </td>
            <td className={styles.table}>
              <EuiKeyPadMenuItem
                checkable="single"
                name={radioGroupName + question.id}
                id={keypadRadioButtonId__2 + question.id}
                label=""
                onChange={(id) => {
                  addChoice(id, question);
                }}
                isSelected={singleSelectedID.some(
                  (e) => e.button === keypadRadioButtonId__2 + question.id
                )}
              >
                <FontAwesomeIcon icon={faCheck} size="3x" />
              </EuiKeyPadMenuItem>
            </td>
            <td className={styles.table}>
              <EuiKeyPadMenuItem
                checkable="single"
                name={radioGroupName + question.id}
                id={keypadRadioButtonId__1 + question.id}
                label=""
                onChange={(id) => {
                  addChoice(id, question);
                }}
                isSelected={singleSelectedID.some(
                  (e) => e.button === keypadRadioButtonId__1 + question.id
                )}
              >
                <FontAwesomeIcon icon={faCheckDouble} size="3x" />
              </EuiKeyPadMenuItem>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={question.id} className={styles.table}>
            <td className={styles.table}>{question.content}</td>
            <td colSpan={"5"} className={styles.table}>
              <EuiTextArea
                name={radioGroupName + question.id}
                value={
                  singleSelectedID.some((e) => e.question.id == question.id)
                    ? singleSelectedID[
                        singleSelectedID.findIndex(
                          (e) => e.question.id == question.id
                        )
                      ].button
                    : ""
                }
                id={question.id}
                onChange={(e) => {
                  addChoice(e.target.value, question);
                }}
              />
            </td>
          </tr>
        );
      }
    });
    tbl = (
      <table className={styles.tabletop}>
        <thead>
          <tr>
            <th className={styles.table}>Question</th>
            <th className={styles.table}>
              Strongly <br />
              Disagree
            </th>
            <th className={styles.table}>Disagree</th>
            <th className={styles.table}>
              No <br />
              prefference
            </th>
            <th className={styles.table}>Agree</th>
            <th className={styles.table}>
              Strongly <br />
              Agree
            </th>
          </tr>
        </thead>
        <tbody>{questionnaire}</tbody>
      </table>
    );
  } else {
    tbl = (
      <div>
        <EuiText>{message}</EuiText>
      </div>
    );
  }

  let button;
  if (num === softfactors.length - 1) {
    button = (
      <EuiButton fill onClick={addAnswers} style={{ background: "#7A2C81" }}>
        Submit
      </EuiButton>
    );
  }
  return (
    <div className={styles.container}>
      <EuiText>
        <h3 style={{ textAlign: "center" }}>{softfactors[num].title}</h3>
        {tbl}
        <EuiSpacer></EuiSpacer>
        {button}
      </EuiText>
    </div>
  );
}

export default Questions;
