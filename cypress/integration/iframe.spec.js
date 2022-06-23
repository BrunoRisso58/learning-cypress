/// <reference types="cypress" />

describe('Iframe', () => {

    it('Deve preencher campo de texto', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body') // traz os filhos do elemento
            cy.wrap(body).find('#tfield')
                .type('Funciona?')
                .should('have.value', 'Funciona?')

            // não deu erro pois não executou o alert dentro do escopo do cypress
            cy.on('window.alert', msg => {
                expect(msg).to.be.equal('Alert Simples')
            })
            cy.wrap(body).find('#otherButton').click()
        })
    })

    it.only('Deve testar frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html');
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })

})