describe('Home', () => {
  it.only('Webapp deve estar online', () => {
    cy.visit('/')
    cy.title()
      .should('eq', 'Gerencie suas tarefas com Mark L')
  })
})