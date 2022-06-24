/// <reference types="cypress" />

describe('Working with locators', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload();
    })

    it('Using xpath', () => {
        cy.xpath('//input')
    })
})