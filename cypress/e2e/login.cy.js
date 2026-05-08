import { usuario } from '../fixtures/acesso.js'

describe('Teste de qualidade - Tela de Login', () => {
  beforeEach(() => {
    cy.visit('https://teste-colmeia-qa.colmeia-corp.com/');
      cy.url().should('include', 'teste-colmeia-qa.colmeia-corp.com');  
        cy.wait(200);
  });

  it('Usuário realiza o login com sucesso', () => {
      cy.get('input[type="email"]').type(usuario.email);
      cy.get('input[type="password"]').type(usuario.senha);
      cy.get('button[type="submit"]').click();
      cy.wait(200);
      cy.url().should('include', '/dashboard');
  });

  it('Usuário tenta realizar o login com senha incorreta', () => {
      cy.get('input[type="email"]').type(usuario.email);
      cy.get('input[type="password"]').type('senhaincorreta');
      cy.get('button[type="submit"]').click();
      cy.wait(200);
      cy.get('field[name="email"]').contains('Usuário ou senha inválidos').should('be.visible');
      cy.get('field[name="password"]').contains('Usuário ou senha inválidos').should('be.visible');
  });

  it('Usuário tenta realizar o login com e-mail incorreta', () => {
      cy.get('input[type="email"]').type('qa@tst.cm');
      cy.get('input[type="password"]').type(usuario.senha);
      cy.get('button[type="submit"]').click();
      cy.wait(200);
      cy.get('field[name="email"]').contains('Usuário ou senha inválidos').should('be.visible');
      cy.get('field[name="password"]').contains('Usuário ou senha inválidos').should('be.visible');
  });

  it('Usuário tenta realizar o login sem preencher os campos', () => {
     cy.get('button[type="submit"]').click();
     cy.wait(200);
     cy.get('field[name="email"]').contains('Usuário ou senha inválidos').should('be.visible');
     cy.get('field[name="password"]').contains('Usuário ou senha inválidos').should('be.visible');
  });

  it('Usuário tenta realizar o login com e-mail em branco', () => {
    cy.get('input[type="password"]').type(usuario.senha);
    cy.get('button[type="submit"]').click();
    cy.wait(200);
    cy.get('field[name="email"]').contains('Usuário ou senha inválidos').should('be.visible');
    cy.get('field[name="password"]').contains('Usuário ou senha inválidos').should('be.visible');
  });

  it('Usuário tenta realizar o login com senha em branco', () => {
    cy.get('input[type="email"]').type(usuario.email);
    cy.get('button[type="submit"]').click();
    cy.wait(200);
    cy.get('field[name="email"]').contains('Usuário ou senha inválidos').should('be.visible');
    cy.get('field[name="password"]').contains('Usuário ou senha inválidos').should('be.visible');
  });

  it('Usuário clica em esqueci a senha e é redicionado a página correspondente', () => {
    cy.contains('Esqueceu sua senha?').click();
    cy.wait(200);
    cy.url().should('include', '/forgot-password');
  });
})