/// <reference types="cypress" />

describe('Work with basic elements', () => {

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

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado'); // não é uma boa estratégia, pois a busca é muito genérica
        cy.get('span').should('contain', 'Cuidado'); // mais específico...
        cy.get('.facilAchar').should('contain', 'Cuidado'); // mais específico ainda...
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...');
    })

    it('Links', () => {
        cy.get('[href="#"]').click();
        cy.get('#resultado').should('have.text', 'Voltou!');

        cy.reload();
        cy.get('#resultado').should('have.not.text', 'Voltou!');
        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text', 'Voltou!');
    })

    it('TextFields', () => {
        cy.get('#formNome')
            .type('Cypress Text')
            // .should('have.text', 'Cypress Text') // não funciona pois o texto em um input HTML fica no atributo value
            .should('have.value', 'Cypress Text');

        cy.get('#elementosForm\\:sugestoes') // quando tiver \, colocar \\, pois \ já é um catacter especial
            .type('textarea')
            .should('have.value', 'textarea');

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???');

        cy.get('[data-cy=dataSobrenome]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto', { delay: 100 })
            .should('have.value', 'acerto')
    })

    it('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc').should('not.be.checked')

        cy.get('#formSexoMasc')
            .click()
            .should('be.checked')

        cy.get('#formSexoFem').should('not.be.checked');

        cy.get('[name="formSexo"]').should('have.length', '2')
    })

    it.only('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name="formComidaFavorita"]').click({ multiple: true })

        cy.get('#formComidaCarne').should('be.checked')
        cy.get('#formComidaFrango').should('be.checked')
        cy.get('#formComidaPizza').should('not.to.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it('Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2graucomp') // o select aceita tanto o value quanto o texto mesmo
            .should('have.value', '2graucomp') // o should aceita apenas o value da option

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp') // o select aceita tanto o value quanto o texto mesmo
            .should('have.value', '1graucomp') // o should aceita apenas o value da option

        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length', 8)
        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = []
            $arr.each(function() {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })
    })

    it.only('Combo múltiplo', () => {
        cy.get('[data-testid=dataEsportes]').select(['natacao', 'Corrida', 'nada']) // para selecionar múltiplos valores, preciso colocá-los em um array (preciso mandar o value para funcionar)
        // cy.get('[data-testid=dataEsportes]').should('have.value', ['natacao', 'Corrida', 'nada']) não funciona, pois está tentando comparar arrays diferentes com os mesmos valores

        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })

        cy.get('[data-testid=dataEsportes]').invoke('val').should('eql', ['natacao', 'Corrida', 'nada']) // eql é como se fosse um deep.equal
    })

})