beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */

describe('Section 1: Visual tests for registration form 3 by Andry-Sten T6ru', () => {

    it('Check that radio button list is correct', () => {

        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

    })

    it('Check that list of cities changes depending on the choice of country', () => {

        cy.get('select[id="country"]').should('exist').should('have.value', '')
        cy.get('select[id="city"]').should('exist').should('be.disabled')
        cy.get('select[id="country"]').select('Estonia')
        cy.get('select[id="country"]').select('Spain')

    })

    it('Check that if city is already chosen and country is updated, then city choice should be removed', () => {

        cy.get('select[id="country"]').should('exist').should('have.value', '')
        cy.get('select[id="city"]').should('exist').should('be.disabled')
        cy.get('select[id="country"]').select('Estonia')
        cy.get('select[id="city"]').should('not.be.disabled')
        cy.get('select[id="city"]').select('Tartu')

    })

    it('Check the checkboxes, their content and links', () => {

        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.contains('Accept our privacy policy').should('exist')
        cy.contains('Accept our cookie policy').should('exist')
        cy.contains('Accept our cookie policy').should('have.attr', 'href', 'cookiePolicy.html')
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.contains('Accept our cookie policy').click()
        cy.url().should('include', 'cookiePolicy.html')

    })

    it('Check email format', () => {

        cy.get('input[name="email"]').should('exist')
        cy.get('input[name="email"]').type('invalid-email')
        cy.get('#emailAlert').should('be.visible')
        cy.contains('Invalid email address.').should('be.visible')
        cy.get('input[name="email"]').clear()
        cy.get('#emailAlert').should('be.visible')
        cy.contains('Email is required.').should('be.visible')
        cy.get('input[name="email"]').clear().type('valid.email@example.com')
        cy.get('#emailAlert').should('not.be.visible')

    })


})


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

describe('Section 1: Visual tests for registration form 3 by Andry-Sten T6ru', () => {

    it('Check all fields are filled in + corresponding assertions', () => {

        cy.get('#name').type('Andry')
        cy.get('input[ng-model="email"]').type('andry@mail.com')
        cy.get('select[id="country"]').select('Estonia')
        cy.get('select[id="city"]').select('Tartu')
        cy.get('input[type="date"]').first().type('2024-07-17')
        cy.get('input[type="radio"][value="Weekly"]').check()
        cy.get('input[name="birthday"]').type('1992-01-31')
        cy.get('input[type="checkbox"]').check().should('be.checked')
        cy.get('form[name="myForm"]').submit()

    })

    //it('only mandatory fields are filled in + corresponding assertions', () => {

        

    //})

})