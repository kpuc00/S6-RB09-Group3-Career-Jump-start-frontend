import React from "react";
import { EuiText, EuiButton } from "@elastic/eui";

const Home = () => {
  return (
    <EuiText>
      <h1>Home page</h1>
      <EuiButton href="/page">Page 1</EuiButton>
    </EuiText>
  );
};
export default Home;
