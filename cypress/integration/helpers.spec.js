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

    it.only('Its...', () => {
        const obj = { nome: 'User', idade: 20 }
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        const obj2 = { nome: 'User', idade: 20, endereco: { rua: 'dos bobos' } }
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        // cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

        cy.title().its('length').should('be.equal', 20)
    })

    it.only('Invoke...', () => {
        const getValue = () => 1;
        const soma = (a, b) => a + b;

        cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
        cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7)

        cy.get('#formNome').invoke('val', 'Texto via invoke') // utilizando o jquery
        // cy.window() me dá o objeto window (que me dá controle na tela inteira), que toda página tem
        cy.window().invoke('alert', 'Dá pra ver?') // exibe um alert com a mensagem do 2° parâmetro
        cy.get('#resultado')
            .invoke('html', '<input type="button" value="hacked">')  // injeta um código html no elemento
    })
})