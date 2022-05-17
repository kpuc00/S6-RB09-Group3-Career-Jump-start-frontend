import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EuiText, EuiButton } from "@elastic/eui";
import { selectUser } from "../features/auth/authSlice";
import { testAdmin, testUser } from "../features/auth/authAPI";

const Page = () => {
  const user = useSelector(selectUser);
  const [userLoaded, setUserLoaded] = useState(false);
  useEffect(() => {
    console.log(user);

    if (user) setUserLoaded(true);
    console.log(userLoaded);
    // if (!userLoaded ) window.location.replace("/login");
  }, [user, userLoaded]);

  async function submitUser() {
    const request = await testUser();
    console.log(request.status, await request.text());
  }

  async function submitAdmin() {
    const request = await testAdmin();
    console.log(request.status, await request.text());
  }

  return (
    <EuiText>
      <h3>Welcome {user ? user.username : "unknown"}</h3>
      <h6>Email:</h6>
      <p>{user && user.email}</p>
      <h6>Roles:</h6>
      <p>{user && user.roles}</p>
      <Link to="/">
        <EuiButton>Back to home</EuiButton>
      </Link>

      <EuiButton onClick={() => submitUser()}>Test user role</EuiButton>
      <EuiButton onClick={() => submitAdmin()}>Test admin role</EuiButton>
    </EuiText>
  );
};
export default Page;
