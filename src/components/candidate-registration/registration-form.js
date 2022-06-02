import React, { useState } from "react";
import styles from "../../styles/general-information.module.css";
import {
  EuiFieldText,
  EuiFieldNumber,
  EuiFieldPassword,
  EuiDatePicker,
  EuiButton,
  EuiCallOut,
  EuiSpacer,
} from "@elastic/eui";
import moment from "moment";
import {
  regUser,
  selectLoading,
  selectError,
} from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState(moment().subtract(20, "y"));
  const role = ["candidate"];
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const minDate = moment().subtract(100, "y");
  const maxDate = moment().subtract(10, "y");
  const dateChange = (date) => {
    setDob(date);
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "username":
        setUsername(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "first_name":
        setFirstName(e.target.value);
        break;
      case "last_name":
        setLastName(e.target.value);
        break;
      case "phone_number":
        setPhoneNumber(e.target.value);
        break;
      default:
        break;
    }
  };

  async function submitForm() {
    dispatch(
      regUser({
        email,
        password,
        username,
        firstName,
        lastName,
        phoneNumber,
        dob,
        role,
      })
    );
  }

  return (
    <>
      <form className={styles.container}>
        {error && (
          <>
            <EuiCallOut color="danger" iconType="alert" title={error.message} />
            <EuiSpacer />
          </>
        )}
        <EuiFieldText
          placeholder="Username"
          name="username"
          autoComplete="on"
          id="username"
          onChange={handleChange}
        />
        <EuiFieldText
          placeholder="First Name"
          name="first_name"
          autoComplete="on"
          id="first_name"
          onChange={handleChange}
        />
        <EuiFieldText
          placeholder="Last Name"
          name="last_name"
          autoComplete="on"
          id="last_name"
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
          placeholder="Phone Number"
          name="phone_number"
          id="phone_number"
          autoComplete="on"
          onChange={handleChange}
        />
        <EuiDatePicker
          label="Date of Birth"
          onChange={dateChange}
          selected={dob}
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
    </>
  );
}

export default RegistrationForm;
