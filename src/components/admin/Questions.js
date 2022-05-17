import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminSelectedTabId } from "../../features/layout/layoutSlice";

const Questions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdminSelectedTabId("questions"));
  });

  return <h1>Questions</h1>;
};

export default Questions;
