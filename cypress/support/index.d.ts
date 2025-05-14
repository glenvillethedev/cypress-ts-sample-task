declare namespace Cypress {
    interface Chainable {
        /**
         * Get the dosage form button by dosage type.
         * @example cy.getDosageFormButton(DOSAGE_TYPE.CAPSULE)
         */
        getDosageFormButton(dosageName: string): Chainable<JQuery<HTMLElement>>;
        /**
         * Get the ingredient list for the current active dosage form.
         */
        getIngredientsList(): Chainable<JQuery<HTMLElement>>;
        /**
         * Get the Capsule Warning Box (Final Units Multiplier) Row
         */
        getCapsuleWarningBox(): Chainable<JQuery<HTMLElement>>;
        /**
         * Get the Compound Name Text for the current active dosage form.
         */
        getCompoundName(): Chainable<JQuery<HTMLElement>>;
        /**
         * Get all the Input for the current dosage form.
         */
        getInputs(): Chainable<JQuery<HTMLInputElement>>;
        /**
         * Get the calculated Quantity from the 'info' popup.
         */
        getCalculatedQuantity(): Chainable<JQuery<HTMLInputElement>>;
        /**
         * Get the calculated Quantity from the 'info' popup.
         */
        getCalculatedPercentage(): Chainable<JQuery<HTMLInputElement>>;
        /**
         * Get the 'info' popup button.
         */
        getBaseIngredientInfoButton(): Chainable<JQuery<HTMLFormElement>>;
        /**
         * Add's Melatonin to the current dosage form.
         * Only works for CREAM dosage form.
         */
        addMelatonin(): Chainable<void>;
        /**
         * Get the 'info' popup button at the specified ingredient index number.
         * @example cy.getInfoButtonAtIndex(0) - first ingredient
         */
        getInfoButtonAtIndex(index: number): Chainable<void>;
        /**
         * Clicks the more_vert icon at the specified ingredient index number.
         * @example cy.clickMoreVertIconAtIndex(0) - first ingredient
         */
        clickMoreVertIconAtIndex(index: number): Chainable<void>;
    }
  }