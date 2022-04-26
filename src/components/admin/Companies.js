import React from "react";
import { EuiSearchBar, EuiSpacer } from "@elastic/eui";
import Company from "./Company";

const fakeDb = [
  {
    id: "1",
    name: "ASML",
    location: "Sofia, Bulgaria",
    logo: "https://source.unsplash.com/1000x1000/?Animals",
    created: Date.now(),
  },
  {
    id: "2",
    name: "SAP",
    location: "Eindhoven, The Netherlands",
    logo: "https://source.unsplash.com/1000x1000/?Landscapes",
    created: Date.now(),
  },
  {
    id: "3",
    name: "Philips",
    location: "Varna, Bulgaria",
    logo: "https://source.unsplash.com/1000x1000/?Urban",
    created: Date.now(),
  },
];

const Companies = () => {
  return (
    <>
      <EuiSearchBar onChange={() => {}} />
      <EuiSpacer />
      {fakeDb.map((company) => {
        return <Company data={company} key={company.id} />;
      })}
    </>
  );
};
export default Companies;
