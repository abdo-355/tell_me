/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";
//@ts-ignore
Cypress.Commands.add("readLocalStorage", (key) => {
  return cy.window().its("localStorage").invoke("getItem", key);
});
