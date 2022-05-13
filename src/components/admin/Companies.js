import React, { useEffect } from "react";
import {
  EuiPanel,
  EuiSearchBar,
  EuiSpacer,
  EuiLoadingSpinner,
  EuiText,
} from "@elastic/eui";
import Company from "./Company";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanies,
  selectCompanies,
  selectUserLoading,
} from "../../features/user/userSlice";

const Companies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const userLoading = useSelector(selectUserLoading);
  const companies = useSelector(selectCompanies);

  console.log(companies);

  return (
    <EuiPanel hasShadow={false}>
      <EuiSearchBar onChange={() => {}} />
      <EuiSpacer />
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
