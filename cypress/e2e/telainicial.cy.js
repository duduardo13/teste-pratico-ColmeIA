import { usuario } from '../fixtures/acesso.js'

describe('Teste de qualidade - Tela de incial', () => {
  beforeEach(() => {
    cy.visit('https://teste-colmeia-qa.colmeia-corp.com/');
      cy.url().should('include', 'teste-colmeia-qa.colmeia-corp.com');  
        cy.wait(200);
          cy.get('input[type="email"]').type(usuario.email);  
            cy.get('input[type="password"]').type(usuario.senha);
            cy.get('button[type="submit"]').click();
          cy.wait(200);
        cy.contains('button', 'Continuar').click();
      cy.url().should('include', '/dashboard');
    cy.wait(200);
  });

  it('Usuário abre o menu para realizar o logout', () => {
      cy.contains('button', 'Candidato').should('be.visible').click();
      cy.contains('Logout').should('be.visible');
  });

  it('Usuário abre o menu principal', () => {
      cy.get('a[routerlink="/dashboard/campanha"]').click();
      cy.url().should('include', '/dashboard/campanha');
      cy.contains('h3', 'Campanha').should('be.visible');
      cy.contains('a', 'Bancos de dados').should('be.visible');
      cy.contains('a', 'Colmeia Forms').should('be.visible');
  });

  it('Usuário abre o menu principal e acessa a tela de Banco de dados', () => {
      cy.get('a[routerlink="/dashboard/campanha"]').click();
      cy.contains('a', 'Bancos de dados').should('be.visible').click();
      cy.url().should('include', '/dashboard/campanha/bancos-de-dados');
  });

  it('Usuário abre o menu principal e acessa a tela de Banco de dados', () => {
      cy.get('a[routerlink="/dashboard/campanha"]').click();
      cy.contains('a', 'Colmeia Forms').should('be.visible').click();
      cy.url().should('include', '/dashboard/campanha/colmeia-forms');
  });

  it('Usuário abre e fecha o menu lateral ao clicar no ícone da campanha', () => {
    cy.get('a[routerlink="/dashboard/campanha"]').click();
    cy.url().should('include', '/dashboard/campanha');
    cy.contains('h3', 'Campanha').should('be.visible');
    cy.get('a[routerlink="/dashboard/campanha"]').click();
    cy.contains('h3', 'Campanha').should('not.exist'); 
})
})