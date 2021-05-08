/// <reference types="cypress" />

describe('Cypress', () => {   
  it('is working', () => {     
    expect(true).to.equal(true)   
  });
    
  it('Opens the app', () => {   
    cy.visit('http://localhost:8080').contains('Curio'); 
  });

  it('Check Login Route', () => {
    cy.get('[href="/login"] > .chakra-text').click();
  });

  it('Checks Input', () => {
    cy.pause();
    cy.get('input[placeholder="Enter Search Term"]').type('rhino');
  }) 

  it('Search redirects to /images', () => {
    cy.get('.chakra-button').click();
    cy.url().should('contain', '/images');
  });

});