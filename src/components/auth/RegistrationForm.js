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
} from "@elastic/eui";
import moment from "moment";
import {
  regUser,
  selectLoading,
  selectError,
} from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

const RegistrationForm = () => {
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
    <EuiPage>
      <EuiPageBody component="div">
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          style={{ minWidth: "60%" }}
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
            <EuiForm component="form" style={{ textAlign: "center" }}>
              <EuiFormRow
                onChange={handleChange}
                id="username"
                label="Username"
                fullWidth
              >
                <EuiFieldText name="username" fullWidth />
              </EuiFormRow>

              <EuiFormRow
                onChange={handleChange}
                id="first_name"
                label="First name"
                fullWidth
              >
                <EuiFieldText name="first_name" fullWidth />
              </EuiFormRow>

              <EuiFormRow
                onChange={handleChange}
                id="last_name"
                label="Last name"
                fullWidth
              >
                <EuiFieldText name="last_name" fullWidth />
              </EuiFormRow>

              <EuiFormRow
                onChange={handleChange}
                id="email"
                label="E-mail"
                fullWidth
              >
                <EuiFieldText name="email" fullWidth />
              </EuiFormRow>

              <EuiFormRow
                onChange={handleChange}
                id="phone_number"
                label="Phone number"
                fullWidth
              >
                <EuiFieldText name="phone_number" fullWidth />
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
              >
                <EuiFieldPassword name="password" fullWidth />
              </EuiFormRow>

              <EuiFormRow
                //onChange={handleChange}
                id="repeat_password"
                label="Repeat password"
                fullWidth
              >
                <EuiFieldPassword name="repeat_password" fullWidth />
              </EuiFormRow>

              <EuiSpacer />

              <EuiButton
                fill
                onClick={() => submitForm()}
                isLoading={loading}
                style={{ background: "#7A2C81" }}
              >
                Sign Up
              </EuiButton>
            </EuiForm>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default RegistrationForm;
