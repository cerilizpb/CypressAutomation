describe('User Registration', () => {
  it('should register a new user', () => {
    cy.visit('https://stage.spinbet.com/en-nz'); // Visit the registration page

    // Fill out the registration form
    cy.get('[data-cy=first-name]').type('John');
    cy.get('[data-cy=last-name]').type('Doe');
    cy.get('[data-cy=email]').type('johndoe@example.com');
    cy.get('[data-cy=password]').type('password123');
    cy.get('[data-cy=confirm-password]').type('password123');

    // Submit the registration form
    cy.get('[data-cy=register-button]').click();

    // Assertions after registration
    cy.url().should('include', '/dashboard'); // Assuming registration redirects to the dashboard
    cy.get('[data-cy=welcome-message]').should('contain', 'Welcome, John!'); // Assuming there's a welcome message on the dashboard
  });
});


// casino_search_spec.js
describe('Casino Search Functionality', () => {
  beforeEach(() => {
      cy.visit('https://stage.spinbet.com/en-nz/casino');
  });

  it('should validate search functionality', () => {
      // Type into the search input
      cy.get('.search-input').type('Your Search Query');

      // Click the search button
      cy.get('.search-button').click();

      // Wait for the search results to load
      cy.wait(2000); // Adjust the wait time as needed

      // Validate the search results
      cy.get('.search-result-item').should('have.length.greaterThan', 0);
  });
});