import React from "react";
import { EuiPage, EuiText, EuiPageTemplate } from "@elastic/eui";

const Admin = () => {
    return (
        <EuiPage >
            <EuiPageTemplate
                template="centeredContent"
                pageContentProps={{ paddingSize: 'none' }}>
                <EuiText>
                    <h1>Admin page</h1>
                </EuiText>
            </EuiPageTemplate>
        </EuiPage>);
};
export default Admin;
