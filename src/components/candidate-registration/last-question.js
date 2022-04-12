import React from 'react'
import { EuiText} from "@elastic/eui";
import styles from '../../styles/questions-first.module.css';

function LastQuestion() {
  return (
    <div>
      <EuiText>
        <h3>Extra support</h3>
        <div className={styles.questions}>
        <p>1. I need special work arrangements to do my job.</p>
        {/* <FontAwesomeIcon icon="fa-solid fa-check-double" /> */}
        <p>2. I need special assistance during work hours.</p>
        <p>3. I must take medications that might make it unsafe for me to do any of the job’s tasks.</p>
        </div>
      </EuiText>
    </div>
  )
}

export default LastQuestion