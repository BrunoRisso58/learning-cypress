/// <reference types="cypress" />

describe('Helpers...', () => {
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

    it('Wrap', () => {
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')
        // obj.should('have.property', 'nome') não funciona, pois o obj não tem a api do cypress
        cy.wrap(obj).should('have.property', 'nome')

        cy.get('#formNome').then($el => {
            cy.wrap($el).type('Funciona') // faz com que o comando funcione
        })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        // promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => console.log(ret)) // faz com que a promise seja monitorada pelo cypress
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)
    })
})