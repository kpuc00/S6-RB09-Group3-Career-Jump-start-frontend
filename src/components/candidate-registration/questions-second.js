import React from 'react'
import { EuiText} from "@elastic/eui";
import styles from '../../styles/questions-first.module.css';

function QuestionsSecond() {
  return (
    <div>
      <EuiText>
        <h3>Social support from colleagues</h3>
        <div className={styles.questions}>
        <p>1. I want to be able to call on colleagues for help with work.</p>
        {/* <FontAwesomeIcon icon="fa-solid fa-check-double" /> */}
        <p>2. I want to be initiated into the company culture.</p>
        <p>3. I want to make contact with colleagues and deal together with setbacks at work.</p>
        </div>
        <h3>Social support from supervisor</h3>
        <div className={styles.questions}>
        <p>1. I prefer the supervisor to be involved in my work and progress.</p>
        <p>2. I prefer the supervisor to express appreciation to employees.</p>
        <p>3. I prefer to be encouraged by the supervisor during activities.</p>
        </div>
      </EuiText>
    </div>
  )
}

export default QuestionsSecond