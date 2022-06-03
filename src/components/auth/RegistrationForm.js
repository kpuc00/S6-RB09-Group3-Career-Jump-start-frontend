import React, { useState } from "react";
import {
  EuiFieldText,
  EuiFieldPassword,
  EuiDatePicker,
  EuiButton,
  EuiCallOut,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiPageContentBody,
  EuiForm,
  EuiSpacer,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import moment from "moment";
import {
  regUser,
  selectLoading,
  selectError,
} from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

const RegistrationForm = () => {
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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
      case "repeat_password":
        setRepeatPassword(e.target.value);
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

  const formValid = () => {
    let errors = {};
    if (email === "")
      errors = { ...errors, email: "Please type your E-mail address." };
    if (password === "")
      errors = { ...errors, password: "Please type password." };
    if (repeatPassword === "" || repeatPassword !== password)
      errors = {
        ...errors,
        repeatPassword: "Repeated password does not match with the password.",
      };
    if (username === "")
      errors = {
        ...errors,
        username: "Please type a username. It must be unique.",
      };
    if (firstName === "")
      errors = { ...errors, firstName: "What is your name?" };
    if (lastName === "")
      errors = { ...errors, lastName: "What is your last name?" };
    if (phoneNumber === "")
      errors = {
        ...errors,
        phoneNumber: "Add your phone number which will be used to contact you.",
      };

    return errors;
  };

  const displayErrors = () => {
    if (showValidationErrors) return formValid();
    else return {};
  };

  function submitForm() {
    setShowValidationErrors(true);
    if (Object.keys(formValid()).length === 0)
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
    <EuiPage>
      <EuiPageBody component="div">
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          style={{ minWidth: "30%" }}
        >
          <EuiPageContentHeader style={{ justifyContent: "center" }}>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>Registration form</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>

          <EuiPageContentBody>
            {error && (
              <>
                <EuiCallOut color="danger" iconType="alert" title={error} />
                <EuiSpacer />
              </>
            )}
            <EuiForm component="form">
              <EuiFormRow
                onChange={handleChange}
                id="username"
                label="Username"
                fullWidth
                isInvalid={displayErrors().hasOwnProperty("username")}
                error={displayErrors().username}
              >
                <EuiFieldText
                  name="username"
                  fullWidth
                  isInvalid={displayErrors().hasOwnProperty("username")}
                />
              </EuiFormRow>

              <EuiFormRow
                onChange={handleChange}
                id="first_name"
                label="First name"
                fullWidth
                isInvalid={displayErrors().hasOwnProperty("firstName")}
                error={displayErrors().firstName}
              >
                <EuiFieldText
                  name="first_name"
                  fullWidth
                  isInvalid={displayErrors().hasOwnProperty("firstName")}
                />
              </EuiFormRow>

              <EuiFormRow
                onChange={handleChange}
                id="last_name"
                label="Last name"
                fullWidth
                isInvalid={displayErrors().hasOwnProperty("lastName")}
                error={displayErrors().lastName}
              >
                <EuiFieldText
                  name="last_name"
                  fullWidth
                  isInvalid={displayErrors().hasOwnProperty("lastName")}
                />
              </EuiFormRow>

              <EuiFormRow
                onChange={handleChange}
                id="email"
                label="E-mail"
                fullWidth
                isInvalid={displayErrors().hasOwnProperty("email")}
                error={displayErrors().email}
              >
                <EuiFieldText
                  name="email"
                  fullWidth
                  isInvalid={displayErrors().hasOwnProperty("email")}
                />
              </EuiFormRow>

              <EuiFormRow
                onChange={handleChange}
                id="phone_number"
                label="Phone number"
                fullWidth
                isInvalid={displayErrors().hasOwnProperty("phoneNumber")}
                error={displayErrors().phoneNumber}
              >
                <EuiFieldText
                  name="phone_number"
                  fullWidth
                  isInvalid={displayErrors().hasOwnProperty("phoneNumber")}
                />
              </EuiFormRow>

              <EuiFormRow
                onChange={handleChange}
                id="dob"
                label="Date of birth"
                fullWidth
              >
                <EuiDatePicker
                  label="Date of Birth"
                  onChange={dateChange}
                  selected={dob}
                  placeholder="Date of Birth"
                  minDate={minDate}
                  maxDate={maxDate}
                  fullWidth
                />
              </EuiFormRow>

              <EuiFormRow
                onChange={handleChange}
                id="password"
                label="Password"
                fullWidth
                isInvalid={displayErrors().hasOwnProperty("password")}
                error={displayErrors().password}
              >
                <EuiFieldPassword
                  name="password"
                  type="dual"
                  fullWidth
                  isInvalid={displayErrors().hasOwnProperty("password")}
                />
              </EuiFormRow>

              <EuiFormRow
                onChange={handleChange}
                id="repeat_password"
                label="Repeat password"
                fullWidth
                isInvalid={displayErrors().hasOwnProperty("repeatPassword")}
                error={displayErrors().repeatPassword}
              >
                <EuiFieldPassword
                  name="repeat_password"
                  type="dual"
                  fullWidth
                  isInvalid={displayErrors().hasOwnProperty("repeatPassword")}
                />
              </EuiFormRow>

              <EuiSpacer />
              <EuiFlexGroup justifyContent="spaceAround">
                <EuiFlexItem grow={false}>
                  <EuiButton
                    fill
                    color="primary"
                    onClick={() => submitForm()}
                    isLoading={loading}
                    style={{ background: "#7A2C81" }}
                  >
                    Sign Up
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiForm>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default RegistrationForm;
