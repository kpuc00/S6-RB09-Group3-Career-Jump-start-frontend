import React, { useEffect } from "react";
import {
  EuiPanel,
  EuiSearchBar,
  EuiSpacer,
  EuiLoadingSpinner,
  EuiText,
  EuiProgress,
} from "@elastic/eui";
import Company from "./Company";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanies,
  selectCompanies,
  selectUserLoading,
  selectUserProcessing,
} from "../../features/user/userSlice";
import { setAdminSelectedTabId } from "../../features/layout/layoutSlice";

const Companies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdminSelectedTabId("companies"));
    dispatch(getCompanies());
  }, [dispatch]);

  const userProcessing = useSelector(selectUserProcessing);
  const userLoading = useSelector(selectUserLoading);
  const companies = useSelector(selectCompanies);

  return (
    <EuiPanel hasShadow={false}>
      <EuiSearchBar onChange={() => {}} />
      <EuiSpacer />
      {userProcessing && <EuiProgress size="xs" color="primary" />}
      {userLoading ? (
        <EuiLoadingSpinner size="xl" />
      ) : companies && companies.length > 0 ? (
        companies.map((company) => {
          return <Company data={company} key={company.id} />;
        })
      ) : (
        <EuiText textAlign="center">
          <p>No items found</p>
        </EuiText>
      )}
    </EuiPanel>
  );
};
export default Companies;
