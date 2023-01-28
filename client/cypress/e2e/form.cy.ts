describe("Forms", () => {
  it("Signup Form", () => {
    cy.visit("/");

    // go to the Signup form
    cy.findByRole("link", { name: /get started →/i }).click();
  });
});
