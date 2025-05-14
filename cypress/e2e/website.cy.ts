describe("Website Test", () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.on("uncaught:exception", (e) => false);
        cy.visit("https://compound.direct/");
        cy.get("nav").contains("Pricing").click();
    })
    // TC4.1
    it("Should redirect to the Pricing Page.", () => {
        cy.url().should('include', '/pricing');
    });
    // TC4.2
    it("Should have the correct title.", () => {
        cy.get("h1").should('have.text', 'Pay as you grow. Switch at any time.')
    })
});