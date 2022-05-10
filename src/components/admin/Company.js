import React from "react";
import {
  EuiPanel,
  EuiImage,
  EuiFlexGroup,
  EuiFlexItem,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiButtonIcon,
  EuiSpacer,
} from "@elastic/eui";

const Company = (props) => {
  const { data } = props;

  const editCompany = (item) => {
    console.log("edit", item);
  };
  const deleteCompany = (item) => {
    console.log("delete", item);
  };
  return (
    <>
      <EuiPanel color="subdued">
        <EuiFlexGroup alignItems="center" justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiImage
              size={100}
              alt={data.username + " logo"}
              src={data.logo}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiDescriptionList>
              <EuiDescriptionListTitle>{data.username}</EuiDescriptionListTitle>
              <EuiDescriptionListDescription>
                Location: {data.location}
              </EuiDescriptionListDescription>
              <EuiDescriptionListDescription>
                Created on: {data.created}
              </EuiDescriptionListDescription>
            </EuiDescriptionList>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              color="warning"
              onClick={() => editCompany(data)}
              iconType="pencil"
              aria-label="Modify company"
            />
            <EuiButtonIcon
              color="danger"
              onClick={() => deleteCompany(data)}
              iconType="trash"
              aria-label="Remove company"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
      <EuiSpacer />
    </>
  );
};

export default Company;
