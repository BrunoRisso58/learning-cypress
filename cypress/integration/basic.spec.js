/// <reference types="cypress" />

describe('Cypress basics', () => {
    it('Should visit a page and assert title', () => {
        // cy é uma variável já criada
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        // método que recebe o título (não funciona dessa forma)
        // const title = cy.title()
        // console.log(title);

        // essa é a forma que iremos usar, pois o cy.title() retorna uma promise
        // o cypress fica tentando verificar a asserção até que o valor do título se transforme no que queremos ou que dê timeout (4s)
        cy.title().should('be.equal', 'Campo de Treinamento');
        cy.title().should('contain', 'Campo');

        // mesma coisa do outro exemplo
        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo');
    })
})