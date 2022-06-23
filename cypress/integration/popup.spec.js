/// <reference types="cypress" />

describe('Popup', () => {

    it('Deve testar popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html');
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })

    it('Deve verificar se o popup foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen') // método para criar uma popup
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
    })
    
})