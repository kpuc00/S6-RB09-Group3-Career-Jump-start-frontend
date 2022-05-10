import React, { useEffect } from "react";
import { EuiSearchBar, EuiSpacer, EuiLoadingSpinner } from "@elastic/eui";
import Company from "./Company";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanies,
  selectCompanies,
  selectCompanyLoading,
} from "../../features/company/companySlice";

const Companies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("fetch companies");
    dispatch(getCompanies());
    console.log("fetch companies end");
  }, [dispatch]);

  const companyLoading = useSelector(selectCompanyLoading);
  const companies = useSelector(selectCompanies);

  return (
    <>
      <EuiSearchBar onChange={() => {}} />
      <EuiSpacer />
      {companyLoading ? (
        <EuiLoadingSpinner size="xl" />
      ) : (
        companies &&
        companies.map((company) => {
          return <Company data={company} key={company.id} />;
        })
      )}
    </>
  );
};
export default Companies;
