describe("My first test", function () {
    it("Gets, types and asserts", function () {  
      cy.visit("https://careerjumpapp.com/login")
  
//Login
cy.url().should('include', '/login')
cy.get('[id=username]')
    .type("cypress")
    .should('have.value', "cypress")
cy.get('[id=password]')
    .type("password")
    .should('have.value', "password")
cy.get('[id=login-submit-button]')
    .click()

cy.url().should('include', '/profile')

cy.contains('Start Questionnaire')
    .click()

cy.get('[type="submit"]').click()
cy.wait(2000)

cy.get('[type="submit"]').click()
cy.wait(2000)

cy.get('[type="submit"]').click()
cy.wait(2000)

cy.get('[type="submit"]').click({force: true})
cy.wait(2000)

cy.get('[type="submit"]').click({force: true})
cy.wait(2000)

cy.contains('Submit').click({force: true})
cy.wait(7000)
cy.wait(200)

// ! Select an element
// cy.get('tr').each(($question) => {
//     cy.wrap($question).get('[type="radio"]').check({force: true})
// })

// cy.get('[type="submit"]').click()

})
})