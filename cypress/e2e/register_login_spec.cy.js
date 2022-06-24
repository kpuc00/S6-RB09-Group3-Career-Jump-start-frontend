import { makePassword, makeUsername } from "../utils/functions";

describe("Create new user and then log in", function () {
  it("Gets, types and asserts", function () {
    let username = makeUsername(8, 4);
    let password = makePassword(3);
    let email = username + "@email.com";

    cy.visit("https://careerjumpapp.com/");
    cy.get("[id=home-register-button]").click();
    cy.url().should("include", "/register");
    cy.get("[id=register-candidate-button]").click();
    cy.url().should("include", "/candidate");

    //Registration form
    cy.get("[id=username]").type(username).should("have.value", username);
    cy.get("[id=first_name]").type("Cypress").should("have.value", "Cypress");
    cy.get("[id=last_name]").type("Testuser").should("have.value", "Testuser");
    cy.get("[id=email]").type(email).should("have.value", email);
    cy.get("[id=phone_number]")
      .type("000111222333")
      .should("have.value", "000111222333");
    cy.get("[id=password]").type(password).should("have.value", password);
    cy.get("[id=repeat_password]")
      .type(password)
      .should("have.value", password);
    cy.get("[id=gdpr-checkbox]").click();
    cy.get("[id=registration-form-submit-button]").click();

    //Login
    cy.url().should("include", "/login");
    cy.get("[id=username]").type(username).should("have.value", username);
    cy.get("[id=password]").type(password).should("have.value", password);
    cy.get("[id=login-submit-button]").click();

    cy.url().should("include", "/profile");
  });
});
