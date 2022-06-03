import React, { useState } from "react";
import styles from "../../styles/general-information.module.css";
import {
  EuiFieldText,
  EuiFieldNumber,
  EuiFieldPassword,
  EuiDatePicker,
  EuiButton,
} from "@elastic/eui";
import moment from "moment";
import { regUser, selectLoading } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

function RegistrationForm() {
  const [startDate, setStartDate] = useState(null);
  const minDate = moment().subtract(100, "y");
  const maxDate = moment().subtract(13, "y");
  const dateChange = (date) => {
    setStartDate(date);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const role = ["candidate"];
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      default:
        break;
    }
  };
  function submitForm() {
    dispatch(regUser({ email, username, password, role }));
  }
  return (
    <form className={styles.container}>
      <EuiFieldText
        placeholder="First & Last name"
        name="name"
        autoComplete="on"
        id="username"
        onChange={handleChange}
      />
      <EuiFieldText
        type="email"
        placeholder="E-mail"
        name="email"
        autoComplete="on"
        id="email"
        onChange={handleChange}
      />
      <EuiFieldNumber
        type="tel"
        placeholder="Phone"
        name="phone"
        autoComplete="on"
      />
      <EuiDatePicker
        label="Date of Birth"
        onChange={dateChange}
        selected={startDate}
        placeholder="Date of Birth"
        minDate={minDate}
        maxDate={maxDate}
      />
      <EuiFieldPassword
        placeholder="Password"
        type="dual"
        name="password"
        autoComplete="on"
        id="password"
        onChange={handleChange}
      />
      <EuiFieldPassword
        placeholder="Confirm Password"
        type="dual"
        name="password"
        autoComplete="on"
      />
      <EuiButton
        color="text"
        fill
        onClick={() => submitForm()}
        isLoading={loading}
        style={{ background: "#7A2C81" }}
      >
        Sign Up
      </EuiButton>
    </form>
  );
}

export default RegistrationForm;
