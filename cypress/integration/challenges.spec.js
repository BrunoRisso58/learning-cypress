/// <reference types="cypress" />

describe('Desafios do curso', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload();
    })

    it.only('Validar mensagens...', () => {

        // lidando com vários alerts...
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome')
            .type('Bruno')
            .should('have.value', 'Bruno')

        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy=dataSobrenome]')
            .type('Risso')
            .should('have.value', 'Risso')

        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click().should('be.checked')

        cy.get('#formCadastrar').click()

        cy.get('#resultado').should('contain', 'Cadastrado!')

        

    })

})