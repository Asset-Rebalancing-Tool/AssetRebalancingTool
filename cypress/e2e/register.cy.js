describe('Try to register new account', () => {

    /**
     * Navigate to signup
     */
    it('navigate to signup', () => {
        // Visit sign in rout
        cy.visit('127.0.0.1:5173')

        // Find the sign-up link and click it
        cy.get('[data-cypress="sign-up-link"]').click()
        // Check if the rout has changed and is indeed sign up
        cy.url().should('include', '/sign-up')
    })

    /**
     * Throw error when invalid inputs
     */
    it('throw error when invalid inputs', () => {
        const emailInput = cy.get('[data-cypress="email-input"]')
        const passwordInput = cy.get('[data-cypress="password-input"]')

        // Error if not a valid email
        emailInput.type('fakemail.com').should('have.class', 'error')
        // Error if not 8 chars long
        passwordInput.type('Abc123').should('have.class', 'error')
        // Error if not at least one uppercase
        passwordInput.type('abc12345').should('have.class', 'error')
    })

    /**
     * Submit form and redirect
     */
    it('submit form and redirect', () => {
        // Find the inputs and add a fake values
        cy.get('[data-cypress="email-input"]').type('fake@mail.com').should('not.have.class', 'error')
        cy.get('[data-cypress="password-input"]').type('#1234.Password').should('not.have.class', 'error')

        // Submit the form
        cy.get('[data-cypress="submit"]').click().should(() => {
            // Check if token is set
            expect(localStorage.getItem('token')).to.not.be.null
        })

        // Check if the rout has changed and is indeed portfolio-overview
        cy.url().should('include', '/portfolio-overview')
    })
})
