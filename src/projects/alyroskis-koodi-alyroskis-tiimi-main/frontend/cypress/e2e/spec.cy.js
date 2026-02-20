const TEST_USER = {
  email: 'maint@example.com',
  password: 'maintpass'
}

describe('Dashboard bin-card grid', () => {
  it('logs in as TEST_USER and checks bin-card grid', () => {
    cy.visit('/');
    cy.get('input[name="email"], input[type="email"]').type(TEST_USER.email);
    cy.get('input[name="password"], input[type="password"]').type(TEST_USER.password);
    cy.get('button, input[type="submit"]').contains(/login/i).click();

    // Wait for dashboard to load
    cy.get('.dashboard').should('exist');
    cy.get('.grid').should('exist');
    cy.get('.bin-card').should('exist');
  });
});