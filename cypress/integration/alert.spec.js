/// <reference types="cypress" />

describe('Work with alerts', () => {

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

    it('Alert', () => {
        cy.get('#alert').click()
        // checar a mensagem do alert
        // pega eventos que ocorrem na tela
        // o segundo parâmetro é o que vai acontecer quando o alert aparecer na tela
        cy.on('window:alert', msg => {
            console.log(msg) // imprime a mensagem do alert no console
            expect(msg).to.be.equal('Alert Simples')
        }) 
    })

})