import 'cypress-real-events';
import { DOSAGE_TYPE } from './constants'

Cypress.Commands.add('getDosageFormButton', (dosageName: string) => {
    cy.get("#root > .flex > :nth-child(1)").children().as("dosageFormButtons")
    switch (dosageName) {
        case DOSAGE_TYPE.CAPSULE:
            return cy.get("@dosageFormButtons").eq(0);
        case DOSAGE_TYPE.TROCHE:
            return cy.get("@dosageFormButtons").eq(1);
        case DOSAGE_TYPE.ORAL_LIQUID:
            return cy.get("@dosageFormButtons").eq(2);           
        case DOSAGE_TYPE.CREAM:
            return cy.get("@dosageFormButtons").eq(3);        
        case DOSAGE_TYPE.SUPPOSITORY:
            return cy.get("@dosageFormButtons").eq(4);      
        case DOSAGE_TYPE.POWDER:
            return cy.get("@dosageFormButtons").eq(5);
    }
});

Cypress.Commands.add('getIngredientsList', () => {
    return cy.get("#root > :nth-child(2)").children().find("[data-rbd-droppable-id='droppable'] form");
});

Cypress.Commands.add('getCompoundName', () => {
    return cy.get("#root > :nth-child(2)").children().eq(3).find("span").invoke("text");
});

Cypress.Commands.add("getCapsuleWarningBox", () => {
    return cy.get("#root > :nth-child(2)").children().eq(3);
})

Cypress.Commands.add('getInputs', () => {
    return cy.get("#root > :nth-child(2)").children().find("input");
});

Cypress.Commands.add('getCalculatedQuantity', () => {
    return cy.get(".calculation.py-2").contains("Quantity").find("span").eq(0).invoke("text")
});

Cypress.Commands.add('getCalculatedPercentage', () => {
    return cy.get(".calculation.py-2").contains("Percent").find("span").eq(0).invoke("text")
});

Cypress.Commands.add('getBaseIngredientInfoButton', () => {
    return cy.getIngredientsList().contains("Base").parentsUntil("[data-rbd-draggable-context-id]").find("form").contains("info")
});

Cypress.Commands.add('addMelatonin', () => {
    cy.getInputs().eq(9).type("{selectall}").type("melatonin", { force: true });
    cy.contains("MELATONIN").then(() => {
        cy.getInputs().eq(9).type("{enter}");
        cy.getIngredientsList().eq(3).find("input").eq(1).type("2").wait(500);
    });
})

Cypress.Commands.add("getInfoButtonAtIndex", (index: number) => {
    cy.getIngredientsList().eq(index).contains("info");
})

Cypress.Commands.add("clickMoreVertIconAtIndex", (index: number) => {
    cy.getIngredientsList().eq(index).contains("more_vert").click();
})