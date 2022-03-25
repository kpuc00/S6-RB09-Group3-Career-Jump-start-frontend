import React from "react";
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

const Login = () => {
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
          <EuiForm component="form">
            <EuiFormRow id="email" label="Email">
              <EuiFieldText name="email" />
            </EuiFormRow>
            <EuiFormRow id="password" label="Password">
              <EuiFieldPassword name="password" />
            </EuiFormRow>
            <EuiSpacer size="m" />
            <EuiButtonIcon
              type="submit"
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
