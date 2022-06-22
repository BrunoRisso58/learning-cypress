/// <reference types="cypress" />

describe('Esperas...', () => {

    // Antes de tudo
    before(() => {
        // vai para a página
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    // Antes de cada teste específico
    beforeEach(() => {
        // recarrega a página
        cy.reload();
    })

    it('Deve aguardar elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it.only('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            .should('not.exist')
            // quando eu garanto que o elemento não existe, não faz sentido ele retornar o mesmo elemento, por isso o should('exist') não funciona
        cy.get('#novoCampo')
            .should('exist')
            .type('funciona')
            .should('have.value', 'funciona')
    })

})