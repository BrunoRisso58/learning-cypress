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
        // on pega eventos que ocorrem na tela
        // o segundo parâmetro é o que vai acontecer quando o alert aparecer na tela
        cy.on('window:alert', msg => {
            console.log(msg) // imprime a mensagem do alert no console
            expect(msg).to.be.equal('Alert Simples')
        }) 
    })

    it.only('Alert com stub', () => {
        const stub = cy.stub().as('alerta') // mock
        cy.on('window:alert', stub) // o stub substitui o método que estávamos utilizando
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it.only('Confirm', () => {
        // o comportamento padrão do cypress é dar ok direto
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click()
    })

    it.only('Deny', () => {
        // o comportamento padrão do cypress é dar ok direto
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()
    })

    it.only('Prompt', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42') // cria um método muito parecido com o real
        })
        // o comportamento padrão do cypress é cancelar o prompt
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?')
        })
        // cy.on('window:alert', msg => {
        //     expect(msg).to.be.equal('Confirmado')
        // })
        cy.get('#prompt').click()
    })

})