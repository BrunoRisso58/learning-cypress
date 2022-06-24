/// <reference types="cypress" />

describe('Fixtures tests', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload();
    })

    it('Get data from fixture file', () => {
        // pega o arquivo de fixture criado com os dados
        // precisa ser uma função normal pois as arrow functions têm um problema com o this
        cy.fixture('userData').as('usuario').then(function() {
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado').should('contain', 'Cadastrado!')
        })  
    })

})