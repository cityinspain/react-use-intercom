/// <reference types="cypress" />

before(() => {
  cy.visit('/useIntercom');

  cy.intercept('https://api-iam.intercom.io/messenger/web/ping').as(
    'intercomPing',
  );
  cy.intercept('https://api-iam.intercom.io/messenger/web/open').as(
    'intercomOpen',
  );
  cy.intercept('https://api-iam.intercom.io/messenger/web/metrics').as(
    'intercomMetrics',
  );
  cy.intercept('https://api-iam.intercom.io/messenger/web/home_cards').as(
    'intercomHomeCards',
  );
});

describe('getVisitorId', () => {
  it('should get visitor id when calling `getVisitorId`', () => {
    cy.visit('/useIntercom');

    cy.get('[data-cy=boot]').click();
    cy.wait('@intercomPing');

    cy.get('[data-cy="visitorId"]').click();

    cy.wait(2000);

    cy.get('[data-cy="visitorIdValue"]').should('exist');
  });
});