/// <reference types="cypress" />

describe('Cypress', () => {   
  it('is working', () => {     
    expect(true).to.equal(true)   
  });
    
  it('Opens the app', () => {   
    cy.visit('http://localhost:8080').contains('Curio'); 
  });

  it('Checks Input', () => {
    cy.get('input[placeholder="Enter Search Term"]');
  }) 

  it('Search redirects to /images', () => {
    cy.get('.chakra-input__right-element > a > .chakra-button').click();
    cy.url().should('contain', '/images');
  });

});