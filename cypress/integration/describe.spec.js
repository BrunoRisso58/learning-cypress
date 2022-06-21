/// <reference types="cypress" />

// it dá o escopo de um teste
it('A external test...', () => {

})

// describe serve para agrupar testes
describe('Should group tests...', () => {
    describe('Should group more specific tests...', () => {
        it('A specific test...', () => {

        })
    })

    // o skip faz com que o teste/grupo não seja executado
    describe.skip('Should group more specific tests 2...', () => {
        it('A specific test 2...', () => {
            
        })
    })

    // o only faz com que apenas aquele teste/grupo seja executado
    it.only('An internal test...', () => {

    })
})