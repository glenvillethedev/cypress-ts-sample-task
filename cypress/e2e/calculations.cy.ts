import { CAPSULE_INITAL_COMPOUND_NAME, CAPSULE_INITIAL_INGREDIENTS, CREAM_INITAL_COMPOUND_NAME, CREAM_INITIAL_INGREDIENTS, DOSAGE_TYPE } from "../support/constants";

describe("Calculations Demo Component Test", () => {
    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.visit("https://d1k1vhh9i7fpj9.cloudfront.net/");
    })
    // DOSAGE FORMS
    describe("Dosage Forms Test", () =>{
        // TC1.1 - verify dosage form selection behaviour and take a screenshot
        it("Should verify dosage form selection behaviour and take a screenshot.", () => {
    
            cy.getDosageFormButton(DOSAGE_TYPE.CAPSULE).as("capsule_button").click(); // capsule
            cy.get('@capsule_button').should('have.class', 'text-yellow-600')
            cy.screenshot("1. Capsule Form", { overwrite : true});
        
            cy.getDosageFormButton(DOSAGE_TYPE.TROCHE).as("troche_button").click(); // troche
            cy.get('@troche_button').should('have.class', 'text-yellow-600')
            cy.screenshot("2. Troche Form", { overwrite : true});
        
            cy.getDosageFormButton(DOSAGE_TYPE.ORAL_LIQUID).as("oral_liquid_button").click(); // oral liquid
            cy.get('@oral_liquid_button').should('have.class', 'text-yellow-600')
            cy.screenshot("3. Oral Liquid Form", { overwrite : true});
        
            cy.getDosageFormButton(DOSAGE_TYPE.CREAM).as("cream_button").click(); // cream
            cy.get('@cream_button').should('have.class', 'text-yellow-600')
            cy.screenshot("4. Cream Form", { overwrite : true});
        
            cy.getDosageFormButton(DOSAGE_TYPE.SUPPOSITORY).as("suppository_button").click(); // suppository
            cy.get('@suppository_button').should('have.class', 'text-yellow-600')
            cy.screenshot("5. Suppository Form", { overwrite : true});
        
            cy.getDosageFormButton(DOSAGE_TYPE.POWDER).as("powder_button").click(); // powder
            cy.get('@powder_button').should('have.class', 'text-yellow-600')
            cy.screenshot("6. Powder Form", { overwrite : true});
          });
    })

    // CREAM
    describe("Cream Dosage Tests",() => {
        beforeEach(() => {
            cy.getDosageFormButton(DOSAGE_TYPE.CREAM).click();
            cy.getIngredientsList().as("ingredientsList")
        })

        // TC2.1 - verify initial ingredients (CREAM)
        it("Should verify initial ingredients.", () => {            
            cy.get("@ingredientsList").should("have.length", 3);
            cy.get("@ingredientsList").eq(0).contains(CREAM_INITIAL_INGREDIENTS[0]).should("exist");
            cy.get("@ingredientsList").eq(1).contains(CREAM_INITIAL_INGREDIENTS[1]).should("exist");
            cy.get("@ingredientsList").eq(2).contains(CREAM_INITIAL_INGREDIENTS[2]).should("exist");
            cy.getCompoundName().should("equal", CREAM_INITAL_COMPOUND_NAME);
        })

        // TC2.2 - verify behaviour when expiry days, final units and wastage percentage initial values are multiplied by 2
        it("Should verify behaviour when expiry days, final units and wastage percentage initial values are multiplied by 2.", () => {
            cy.get("@ingredientsList").contains("info").then(() => {
                
                cy.getInputs().eq(1).type("{selectall}").type("180", { force: true }); // expiry days * 2
                cy.getInputs().eq(2).clear().type("200", { force: true }); // final units * 2
                cy.getInputs().eq(3).type("{selectall}").type("5", { force: true }); // wastage percentage * 2

                cy.wait(500);
                cy.getInfoButtonAtIndex(0).as("info_0");
                cy.get("@info_0").trigger("mouseover");
                cy.getCalculatedQuantity().should("equal", "(25.2g)"); // quantity (SALICYLIC ACID , USP)
                cy.get("@info_0").trigger("mouseout");

                cy.getInfoButtonAtIndex(1).as("info_1");
                cy.get("@info_1").trigger("mouseover");
                cy.getCalculatedQuantity().should("equal", "(21g — 20.528mL)"); // quantity (PROPYLENE GLYCOL)
                cy.get("@info_1").trigger("mouseout");

                cy.getInfoButtonAtIndex(2).as("info_2");
                cy.get("@info_2").trigger("mouseover");
                cy.getCalculatedQuantity().should("equal", "(163.8g)"); // quantity (SORBOLENE CREAM)
                cy.get("@info_2").trigger("mouseout");
            });
        })

        // TC2.3 - verify behaviour when Melatonin (2% Strength) ingredient is added
        it("Should verify behaviour when Melatonin (2% Strength) ingredient is added.", () => {
            cy.addMelatonin();

            cy.get("@ingredientsList").should("have.length", 4);
            cy.get("@ingredientsList").eq(3).contains("MELATONIN").should("exist");
            cy.getCompoundName().should("equal", "SALICYLIC ACID 12%, MELATONIN 2% TOPICAL CREAM");
        })

        // TC2.4 - Base type ingredients dynamically change percentage to complete the 100%
        it("Base type ingredients should dynamically change percentage to complete the 100%.", () => {
            cy.getBaseIngredientInfoButton().as("base_ingredient_info_button")

            cy.get("@base_ingredient_info_button").trigger("mouseover");
            cy.getCalculatedPercentage().should("equal", "(78%)"); // percent (SORBOLENE CREAM)
            cy.get("@base_ingredient_info_button").trigger("mouseout");

            cy.addMelatonin();

            cy.get("@base_ingredient_info_button").trigger("mouseover");
            cy.getCalculatedPercentage().should("equal", "(75.996%)"); // percent (SORBOLENE CREAM)
            cy.get("@base_ingredient_info_button").trigger("mouseout");
        })

        // TC2.5 - verify behaviour when Melatonin’s more_vert icon is clicked and ‘Use as Excipient’ option is clicked
        it("Should verify behaviour when Melatonin’s more_vert icon is clicked and ‘Use as Excipient’ option is clicked.", () => {
            cy.addMelatonin();

            cy.clickMoreVertIconAtIndex(3);
            cy.get("#popup-root").contains("Use as Excipient").click(); // Click 'Use as Excipient'
            cy.clickMoreVertIconAtIndex(3);

            cy.get("@ingredientsList").eq(3).contains("Excipient").should("exist"); 
            cy.getCompoundName().should("equal", CREAM_INITAL_COMPOUND_NAME);
        })

        // TC2.6 - verify behaviour when Melatonin’s more_vert icon is clicked and ‘Remove’ option is clicked
        it("Should verify behaviour when Melatonin’s more_vert icon is clicked and ‘remove’ option is clicked.", () => {
            cy.addMelatonin();
            cy.get("@ingredientsList").should("have.length", 4);
            cy.get("@ingredientsList").contains("MELATONIN").should("exist");
            cy.getCompoundName().should("equal", "SALICYLIC ACID 12%, MELATONIN 2% TOPICAL CREAM");
            
            cy.clickMoreVertIconAtIndex(3);
            cy.get("#popup-root").contains("Remove").click(); // Click 'Remove'

            cy.get("@ingredientsList").should("have.length", 3);
            cy.get("@ingredientsList").contains("MELATONIN").should("not.exist");
            cy.getCompoundName().should("equal", CREAM_INITAL_COMPOUND_NAME);

            cy.getBaseIngredientInfoButton().as("base_ingredient_info_button")
            cy.get("@base_ingredient_info_button").trigger("mouseover");
            cy.getCalculatedPercentage().should("equal", "(78%)"); // percent (SORBOLENE CREAM)
            cy.get("@base_ingredient_info_button").trigger("mouseout");
        })

        // TC2.7 (Bonus) - verify behaviour when ingredient’s order is reversed
        it("Should verify behaviour when ingredient’s order is reversed.", () => {
            cy.addMelatonin();

            // reverse order
            cy.get("[data-rbd-drag-handle-draggable-id='194077']").focus().realPress('Space').realPress('ArrowUp').realPress('ArrowUp').realPress('ArrowUp').realPress('Space'); 
            cy.get("[data-rbd-drag-handle-draggable-id='196135']").focus().realPress('Space').realPress('ArrowUp').realPress('ArrowUp').realPress('Space');
            cy.get("[data-rbd-drag-handle-draggable-id='194606']").focus().realPress('Space').realPress('ArrowUp').realPress('Space');

            cy.getCompoundName().should("equal", "MELATONIN 2%, SALICYLIC ACID 12% TOPICAL CREAM");
        })
    })

    // CAPSULE 
    describe("Capsule Dosage Tests",() => {
        beforeEach(() => {
            cy.getDosageFormButton(DOSAGE_TYPE.CAPSULE).click();
            cy.getIngredientsList().as("ingredientsList")
        })

        // TC3.1 - verify initial ingredients (CAPSULE)
        it("Should verify initial ingredients.", () => {            
            cy.get("@ingredientsList").should("have.length", 6);
            cy.get("@ingredientsList").eq(0).contains(CAPSULE_INITIAL_INGREDIENTS[0]).should("exist");
            cy.get("@ingredientsList").eq(1).contains(CAPSULE_INITIAL_INGREDIENTS[1]).should("exist");
            cy.get("@ingredientsList").eq(2).contains(CAPSULE_INITIAL_INGREDIENTS[2]).should("exist");
            cy.get("@ingredientsList").eq(3).contains(CAPSULE_INITIAL_INGREDIENTS[3]).should("exist");
            cy.get("@ingredientsList").eq(4).contains(CAPSULE_INITIAL_INGREDIENTS[4]).should("exist");
            cy.get("@ingredientsList").eq(5).contains(CAPSULE_INITIAL_INGREDIENTS[5]).should("exist");
            cy.getCompoundName().should("equal", CAPSULE_INITAL_COMPOUND_NAME);
        })

        // TC3.2 - verify behaviour when capsule size is changed to #3
        it("Should verify behaviour when capsule size is changed to #3.", () => {
            cy.get('.react-select__control').eq(1).click().get(".react-select__menu").find('.react-select__option').last().click(); // click '#3' option on 'capsule size' dropdown
            cy.getCapsuleWarningBox().contains("Total ingredient quantity exceeds the capsule total volume. (113.6%)").should("exist");
        })
    })
});