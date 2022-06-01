import {
  EuiText,
  EuiKeyPadMenuItem,
  useGeneratedHtmlId,
  EuiButton,
  EuiPanel
} from "@elastic/eui";
import React, {useState, useEffect} from "react";
import styles from "../../styles/questions.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheck,
  faXmark,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {
  getQuestionsBySFId,
  getSF,
  selectQuestions,
  selectSoftFactors,
  answerPost,
} from "../../features/softfactor/softfactorSlice";

function Questions(props) {
  const {num} = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSF());
  }, [dispatch]);

  const softfactors = useSelector(selectSoftFactors);

  useEffect(() => {
    const id = softfactors[num].id;
    dispatch(getQuestionsBySFId({id}));
  }, [dispatch, num, softfactors]);

  const questions = useSelector(selectQuestions);

  let questionnaire;

  const radioGroupName = useGeneratedHtmlId({prefix: "radioGroup"});

  const keypadRadioButtonId__1 = "Strongly Agree";
  const keypadRadioButtonId__2 = "Agree";
  const keypadRadioButtonId__3 = "No prefference";
  const keypadRadioButtonId__4 = "Disagree";
  const keypadRadioButtonId__5 = "Strongly Disagree";

  const [singleSelectedID, setSingleSelectedID] = useState([]);

  const addChoice = (button, id) => {
    let obj = {button: button, question: id};
    const test = singleSelectedID.some((e) => e.question === id);
    if (!test) {
      let arr = singleSelectedID.concat(obj);
      setSingleSelectedID(arr);
    } else {
      let index = singleSelectedID.findIndex((e) => e.question === id);
      let arr = (singleSelectedID.splice(index, 1), singleSelectedID);
      let arr2 = arr.concat(obj);
      setSingleSelectedID(arr2);
    }
  };

  async function addAnswers() {
    await singleSelectedID.forEach((answer) => {
      const content = answer.button.replace(answer.question.id, "");
      const question = answer.question;
      dispatch(answerPost({content, question}));
      console.log("Answer Added", answer)
    });
    console.log("Foreach finished")
  }

  let tbl;
  if (questions !== null) {
    questionnaire = questions.map((question) => (
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
                <FontAwesomeIcon style={{marginRight: 2}} icon={faXmark} size="3x"/>
                <FontAwesomeIcon icon={faXmark} size="3x"/>
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
                <FontAwesomeIcon icon={faXmark} size="3x"/>
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
                <FontAwesomeIcon icon={faMinus} size="3x"/>
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
                <FontAwesomeIcon icon={faCheck} size="3x"/>
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
                <FontAwesomeIcon icon={faCheckDouble} size="3x"/>
              </EuiKeyPadMenuItem>
            </td>
        </tr>
  ));
  tbl = (
    <table className={styles.tabletop}>
      <thead>
      <tr>
        <th className={styles.table}>
          Question
        </th>
        <th className={styles.table}>
          Strongly <br/>
          Disagree
        </th>
        <th className={styles.table}>
          Disagree
        </th>
        <th className={styles.table}>
          No <br/>
          prefference
        </th>
        <th className={styles.table}>
          Agree
        </th>
        <th className={styles.table}>
          Strongly <br/>
          Agree
        </th>
      </tr>
      </thead>
      <tbody>{questionnaire}</tbody>
    </table>
  );
  } else
    {
      tbl = (
          <div>
            <EuiText>There are no questions for this soft factor yet.</EuiText>
          </div>
      );
    }

  let button;
  if (num === softfactors.length - 1)
    {
      button = (
          <EuiButton fill onClick={addAnswers}>
            Submit
          </EuiButton>
      );
    }
  return (
    <div className={styles.container}>
      <EuiText>
        <h3 style={{textAlign: "center"}}>{softfactors[num].title}</h3>
        {tbl}
        {button}
      </EuiText>
    </div>
  );
  }

  export default Questions;
