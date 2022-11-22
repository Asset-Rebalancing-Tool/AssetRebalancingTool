describe('Try to register new account', () => {
    it('navigate to signup, fill out form and submit', () => {
        // Visit sign in rout
        cy.visit('127.0.0.1:5173')

        // Find the inputs and add a fake values
        cy.get('[data-cypress="email-input"]').type('fake@mail.com')
        cy.get('[data-cypress="password-input"]').type('#1234.Password')

        // Submit the form
        // Submit the form
        cy.get('[data-cypress="submit"]').click().should(() => {
            // Check if token is set
            expect(localStorage.getItem('token')).to.not.be.null
        })

        // Check if the rout has changed and is indeed portfolio-overview
        cy.url().should('include', '/portfolio-overview')
    })
})
