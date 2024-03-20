/// <reference types="cypress" />

describe("todo-app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should add new todos", () => {
    cy.get(".input").type("Test");
    cy.get(".removeButton").click();
    cy.get(".liste li").should("have.length", 1);
  });
});
