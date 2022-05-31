import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminSelectedTabId } from "../../features/layout/layoutSlice";

const SoftFactors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdminSelectedTabId("softfactors"));
  });

  return <h1>Soft factors</h1>;
};

export default SoftFactors;
