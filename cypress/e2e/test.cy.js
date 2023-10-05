// registration.spec.js

describe('TC1.1 User Registration', () => {
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

describe('TC1.2: Empty Registration Form Submission', () => {
  it('should not allow submission of empty registration form', () => {
    cy.visit('https://stage.spinbet.com/en-nz');
    
    // Locate registration form fields and submit button
    cy.get('[data-testid="registration-form"]').within(() => {
      // Locate and submit the form without filling any fields
      cy.get('[data-testid="register-button"]').click();
    });
    
    // Assert error messages or behavior when the form submission fails
    cy.get('[data-testid="error-message"]').should('exist');
  });
});

describe('TC1.3: Registration Form Validation-Invalid', () => {
    it('Should show error for invalid email format', () => {
        cy.visit('https://stage.spinbet.com/en-nz'); // Visit the registration page

        // Fill out the registration form with an invalid email address
        cy.get('[data-testid=registration-email-input]').type('invalidemail'); // Invalid email format

        // Submit the form
        cy.get('[data-testid=registration-submit-button]').click();

        // Assert that an error message is displayed for the email input field
        cy.get('[data-testid=registration-email-error-message]').should('be.visible');
        cy.get('[data-testid=registration-email-error-message]').should('contain', 'Invalid email address format');
    });
});


// casino_search_spec.js
describe('TC2.1 Casino Search Functionality', () => {
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

escribe('TC2.2 Casino Lobby Empty Search', () => {
  it('should validate empty search functionality', () => {
    // Visit the Casino Lobby page
    cy.visit('https://stage.spinbet.com/en-nz/casino');
    
    // Locate the search input field and submit the empty search
    cy.get('.search-input').type('{enter}');
    
    // Validate that no search results are displayed
    cy.get('.search-results').should('not.exist');
    
    // Optionally, you can also validate the presence of a message indicating no search results found
    cy.contains('No results found').should('exist');
  });
});


scribe('TC2.3 Search Functionality - Invalid', () => {
  it('should validate search with special characters', () => {
    // Visit the casino lobby page
    cy.visit('https://stage.spinbet.com/en-nz/casino');

    // Perform a search with special characters
    const specialCharacter = '@#$%';
    cy.get('[data-cy=search-input]').type(specialCharacter);
    cy.get('[data-cy=search-button]').click();

    // Validate search results
    cy.get('[data-cy=search-results]').should('contain', 'No results found');
  });
});