import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiText,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiButtonIcon,
  EuiFieldPassword,
  EuiSpacer,
  EuiCallOut,
  EuiPageContentBody,
} from "@elastic/eui";
import {
  clearAuthState,
  loginUser,
  selectError,
  selectLoading,
  selectMessage,
  selectUserLoggedOut,
  setRegisteredState,
} from "../../features/auth/authSlice";
import { clearUserState } from "../../features/user/userSlice";
import { clearSoftFactorState } from "../../features/softfactor/softfactorSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const message = useSelector(selectMessage);
  const userLoggedOut = useSelector(selectUserLoggedOut);

  useEffect(() => {
    dispatch(setRegisteredState(false));
    if (userLoggedOut) {
      dispatch(clearAuthState());
      dispatch(clearUserState());
      dispatch(clearSoftFactorState());
    }
  }, [dispatch, userLoggedOut]);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  function submitForm() {
    if (username !== "" && password !== "")
      dispatch(loginUser({ username, password }));
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
                <h2>Login</h2>
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
            {message && (
              <>
                <EuiCallOut title={message} />
                <EuiSpacer />
              </>
            )}
            <EuiForm component="form">
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
                id="password"
                label="Password"
                fullWidth
              >
                <EuiFieldPassword name="password" fullWidth />
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
                disabled={username !== "" && password !== "" ? false : true}
              />
            </EuiForm>
            <EuiSpacer size="s" />
            <EuiText textAlign="center">
              <span>Not registered?</span>{" "}
              <Link to="/register">
                <span>Register</span>
              </Link>
            </EuiText>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
export default Login;
