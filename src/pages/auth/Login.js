import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "@elastic/eui";
import { loginUser, selectLoading } from "../../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      default:
        break;
    }
  };

  function submitForm() {
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
            {loading && console.log("aaa")}
          </EuiText>
          <EuiSpacer size="m" />
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
            />
          </EuiForm>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
export default Login;
