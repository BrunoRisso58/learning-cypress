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

    it.only('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        // cy.get('#lista li')
            // ele só fica retentando o assert e o comando imediato a ele, portanto o find
            // como eke fez um get #lista li, então ele já fixou a busca no Item 1
            // quando deu erro, o Item 2 já estava ali mas ele já havia focado no Item 2
            // .find('span')
            // .should('contain', 'Item 2')
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

})