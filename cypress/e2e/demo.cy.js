describe('Toolshop Cypress Demo Suite – Registration, Login, and Search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  // 1. Registration – Dữ liệu từ CSV
  it('should register multiple users from CSV file', () => {
    cy.task('readCsvFile', 'register_test_data.csv').then((users) => {
      users.forEach((user) => {
        cy.visit('http://localhost:4200/#/auth/register');

        cy.get('[data-test="first-name"]').clear().type(user.FirstName);
        cy.get('[data-test="last-name"]').clear().type(user.LastName);
        cy.get('[data-test="dob"]').clear().type(user.DOB);
        cy.get('[data-test="address"]').clear().type(user.Street);
        cy.get('[data-test="postcode"]').clear().type(user.PostalCode);
        cy.get('[data-test="city"]').clear().type(user.City);
        cy.get('[data-test="state"]').clear().type(user.State);
        cy.get('[data-test="country"]').select(user.Country);
        cy.get('[data-test="phone"]').clear().type(user.Phone);
        cy.get('[data-test="email"]').clear().type(user.Email);
        cy.get('[type="password"]').clear().type(user.Password);
        cy.get('[type="submit"]').click();

        cy.get('body').then(($body) => {
          if ($body.find('.alert-success').length > 0) {
            cy.get('.alert-success').should('contain.text', 'successfully');
          } else if ($body.find('.alert-danger').length > 0) {
            cy.get('.alert-danger').should('be.visible');
          } else {
            cy.log('No success or error message shown');
          }
        });
      });
    });
  });

  // 2. Login – Debuggability, Time Travel
  it('should login with valid credentials and display account', () => {
    cy.get('body').then(($body) => {
      if ($body.find('[data-test="nav-sign-in"]').length) {
        cy.get('[data-test="nav-sign-in"]').click();
      } else {
        cy.get('.navbar-toggler').click();
        cy.get('[data-test="nav-sign-in"]').click();
      }
    });

    cy.get('[data-test="email"]').type('customer@practicesoftwaretesting.com');
    cy.get('[data-test="password"]').type('welcome01');
    cy.get('[data-test="login-submit"]').click();

    cy.get('[data-test="page-title"]').should('contain.text', 'My account');
  });

  // 3. Search – Automatic Waiting, Time Travel
  it('should search for a product using keyword input', () => {
    cy.get('[data-test="search-query"]').should('be.visible').type('speiler');
    cy.get('[data-test="search-submit"]').click();
    cy.get('[data-test="search-term"]').should('contain.text', 'screwdriver');
  });

  // 4. Accessibility
  it('should check accessibility attributes on forms', () => {
    cy.get('form').should('exist');
    cy.get('[aria-label], [aria-describedby]').should('have.length.greaterThan', 0);
  });
});
