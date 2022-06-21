/// <reference types="cypress" />

describe('Work with basic elements', () => {
    it('Text', () => {
        // vai para a página
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        cy.get('body').should('contain', 'Cuidado'); // não é uma boa estratégia, pois a busca é muito genérica
        cy.get('span').should('contain', 'Cuidado'); // mais específico...
        cy.get('.facilAchar').should('contain', 'Cuidado'); // mais específico ainda...
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...');
    })

    it.only('Links', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.get('[href="#"]').click();
        cy.get('#resultado').should('have.text', 'Voltou!');

        cy.reload();
        cy.get('#resultado').should('have.not.text', 'Voltou!');
        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text', 'Voltou!');
    })
})