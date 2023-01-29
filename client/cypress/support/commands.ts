/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      readLocalStorage(value: string): Chainable<string>;
    }
  }
}

//@ts-ignore
Cypress.Commands.add("readLocalStorage", (key) => {
  return cy.window().its("localStorage").invoke("getItem", key);
});
