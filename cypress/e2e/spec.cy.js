/// <reference types="cypress" />

describe("todo-app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should add new todos", () => {
    cy.document()
      .then((doc) => doc.querySelectorAll("[data-cy='li']").length + 0)
      .then((oldLength) => {
        console.log(document.querySelectorAll("[data-cy='li']"));
        cy.get(".input").type("Test");
        cy.get(".add").click();
        cy.get("[data-cy='li']").should("have.length", oldLength + 1);
      });
  });
});
