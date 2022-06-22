/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        // cy é uma variável já criada
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        // método que recebe o título (não funciona dessa forma)
        // const title = cy.title()
        // console.log(title);

        cy.pause();

        // essa é a forma que iremos usar, pois o cy.title() retorna uma promise
        // o cypress fica tentando verificar a asserção até que o valor do título se transforme no que queremos ou que dê timeout (4s)
        cy.title().should('be.equal', 'Campo de Treinamento');
        cy.title().should('contain', 'Campo'); // o debug é bom para pegar mais detalhes sobre algum ponto

        cy.title().then(title => {
            console.log(title);
        })

        // mesma coisa do outro exemplo
        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo');
    })

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!');
    })
})