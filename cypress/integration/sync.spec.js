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

    it.only('Uso do timeout', () => {
        // cy.get('#buttonDelay').click()
        // ele vai esperar apenas 1 segundo para que o campo apareça, em vez dos 4 segundos padrão
        // cy.get('#novoCampo', { timeout: 1000 }).should('exist')

        // cy.get('#buttonListDOM').click()
        // // cy.wait(5000) // pause(5000) do Laravel Dusk. É bom evitar esse wait fixo
        // // sem o wait daria errado, pois ele esperaria mais que o tempo padrão (4s)
        // cy.get('#lista li span', { timeout: 30000 })
        //     .should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
            .should('have.length', '1') // dá certo pois quando satisfazer essa condição, ele já para
        cy.get('#lista li span')
            .should('have.length', '2')
    })

})