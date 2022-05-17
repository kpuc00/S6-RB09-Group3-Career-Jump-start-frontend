import React, { useEffect } from "react";
import { EuiPageBody, EuiTitle, EuiButton, EuiSpacer } from "@elastic/eui";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <EuiPageBody>
      <EuiSpacer size="xl" />
      <EuiTitle>
        <h1>You have been logged out</h1>
      </EuiTitle>
      <EuiSpacer size="xl" />
      <Link to="/login">
        <EuiButton>Go Back to Login Page</EuiButton>
      </Link>
    </EuiPageBody>
  );
};
export default Logout;
