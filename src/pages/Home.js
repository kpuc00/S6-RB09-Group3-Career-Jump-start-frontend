import React from "react";
import { EuiText, EuiButton } from "@elastic/eui";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <EuiText>
      <h1>Home page</h1>
      <Link to="/page">
        <EuiButton>Page 1</EuiButton>
      </Link>
    </EuiText>
  );
};
export default Home;
