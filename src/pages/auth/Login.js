import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiText,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiButtonIcon,
  EuiFieldPassword,
  EuiSpacer,
  EuiCallOut,
} from "@elastic/eui";
import {
  loginUser,
  selectError,
  selectLoading,
  selectMessage,
} from "../../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const message = useSelector(selectMessage);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  function submitForm() {
    if (email !== "" && password !== "")
      dispatch(loginUser({ email, password }));
  }

  return (
    <EuiPage paddingSize="none">
      <EuiPageBody paddingSize="l">
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="none"
          color="transparent"
        >
          <EuiText textAlign="center">
            <h1>Login</h1>
          </EuiText>
          <EuiSpacer size="m" />
          {error && (
            <>
              <EuiCallOut
                color="danger"
                iconType="alert"
                title={error.message}
              />
              <EuiSpacer />
            </>
          )}
          {message && (
            <>
              <EuiCallOut title={message.message} />
              <EuiSpacer />
            </>
          )}

          <EuiForm component="form">
            <EuiFormRow onChange={handleChange} id="email" label="Email">
              <EuiFieldText name="email" />
            </EuiFormRow>
            <EuiFormRow onChange={handleChange} id="password" label="Password">
              <EuiFieldPassword name="password" />
            </EuiFormRow>
            <EuiSpacer size="m" />
            <EuiButtonIcon
              onClick={() => submitForm()}
              isLoading={loading}
              display="base"
              iconType="push"
              iconSize="l"
              size="m"
              aria-label="Login"
              disabled={email !== "" && password !== "" ? false : true}
            />
          </EuiForm>
          <EuiSpacer size="s" />
          <EuiText textAlign="center">
            <span>Not registered?</span>{" "}
            <Link to="/register">
              <span>Register</span>
            </Link>
          </EuiText>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
export default Login;
