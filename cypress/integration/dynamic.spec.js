/// <reference types="cypress" />

describe('Dynamic tests', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload();
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariana']

    foods.forEach(food => {
        it(`Cadastro com a comida ${food}`, () => {
            cy.get('#formNome').type('Usuario')
            cy.get('[data-cy=dataSobrenome]').type('Qualquer')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.get(`#formComida${food}`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')

            cy.get('#formCadastrar').click()
            cy.get('#resultado').should('contain', 'Cadastrado!')
        })
    })
})
