import React, { useEffect } from "react";
import { EuiText } from "@elastic/eui";

const NotFound = () => {
  useEffect(() => {
    document.title = "404";
  });
  return (
    <EuiText>
      <h1>404</h1>
      <p>The adress you are trying to reach was not found!</p>
    </EuiText>
  );
};
export default NotFound;
