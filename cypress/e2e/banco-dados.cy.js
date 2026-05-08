import { usuario } from '../fixtures/acesso.js'

describe('Teste de qualidade - Tela de banco de dados', () => {
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
          cy.get('a[routerlink="/dashboard/campanha"]').click();
        cy.contains('a', 'Bancos de dados').should('be.visible').click();
      cy.url().should('include', '/dashboard/campanha/bancos-de-dados');
    cy.wait(200);
  });

    it('Usuário deve pesquisar por um registro inexistente e exibir mensagem de nenhum resultado', () => {
        cy.get('input[type="search"][placeholder="Pesquisar"]').type('teste{enter}')
        cy.contains('td', 'Nenhum resultado encontrado para "teste"').should('be.visible')
        cy.get('tbody tr').should('have.length', 1) 
    });

    it('Usuário limpa o campo de pesquisa', () => {
        cy.get('input[type="search"][placeholder="Pesquisar"]').type('teste')
        cy.get('input[type="search"][placeholder="Pesquisar"]').should('have.value', 'teste')
        cy.get('input[type="search"][placeholder="Pesquisar"]').clear()
        cy.get('input[type="search"][placeholder="Pesquisar"]').should('have.value', '')
    });

    it('Usuário cria um novo registro e valida na tabela', () => {
        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const dataFormatada = `${ano}-${mes}-${dia}`

        cy.contains('button', 'Criar').click();
        cy.contains('h2', 'Adicionar novo item').should('be.visible');
        cy.get('input[placeholder="Nome do item"]').type('automatizado');
        cy.contains('button', 'Salvar').click();
        cy.contains('h2', 'Adicionar novo item').should('not.exist');
        cy.contains('tr', 'automatizado').should('be.visible').and('contain.text', dataFormatada);
    });

    it('Usuário tenta cadastrar registro sem preencher o campo', () => {
        cy.contains('button', 'Criar').click()
        cy.contains('h2', 'Adicionar novo item').should('be.visible')
        cy.contains('button', 'Salvar').click()
        cy.contains('p', 'O nome do item é obrigatório').should('be.visible')
        cy.get('input[placeholder="Nome do item"]').should('have.class', 'border-red-500')
        cy.contains('h2', 'Adicionar novo item').should('be.visible')
    });

    it('Usuário exclui o registro e verificar se a tabela ficou vazia', () => {
        cy.contains('button', 'Criar').click();
        cy.contains('h2', 'Adicionar novo item').should('be.visible');
        cy.get('input[placeholder="Nome do item"]').type('automatizado');
        cy.contains('button', 'Salvar').click();
        cy.contains('h2', 'Adicionar novo item').should('not.exist');
        cy.contains('tr', 'automatizado').find('button[title="Apagar"]').click()
        cy.contains('tr', 'automatizado').should('not.exist')
    });

    it('Usuário arquiva o registro e verifica se está na lista de arquivados', () => {
        //Bug encontrado: Não apresenta registros arquivados
        cy.contains('button', 'Criar').click();
        cy.contains('h2', 'Adicionar novo item').should('be.visible');
        cy.get('input[placeholder="Nome do item"]').type('automatizado');
        cy.contains('button', 'Salvar').click();
        cy.contains('h2', 'Adicionar novo item').should('not.exist');
        cy.contains('tr', 'automatizado').find('button[title="Arquivar"]').click();
        cy.contains('tr', 'automatizado').should('not.exist');

        const cabecalho = cy.get('input[placeholder="Pesquisar"]').closest('.flex.justify-between');
        cabecalho.find('button[variant="icon"]').first().as('botaoArquivados').click();

        cy.get('@botaoArquivados').find('svg').should('have.class', 'text-red-300');
        cy.contains('h3', 'Itens Arquivados').should('be.visible');
        cy.contains('tr', 'automatizado').should('be.visible');
    });

    it('Usuário alterna entre a listagem comum e arquivados mantendo os dados da tela', () => {
        cy.contains('button', 'Criar').click();
        cy.contains('h2', 'Adicionar novo item').should('be.visible');
        cy.get('input[placeholder="Nome do item"]').type('automatizado');
        cy.contains('button', 'Salvar').click();
        cy.contains('h2', 'Adicionar novo item').should('not.exist');
        cy.contains('tr', 'automatizado').should('be.visible');

        const cabecalho = cy.get('input[placeholder="Pesquisar"]').closest('.flex.justify-between');
        
        cabecalho.find('button[variant="icon"]').first().as('btnAlternaList').click();

        cy.contains('h3', 'Itens Arquivados').should('be.visible');
        cy.contains('tr', 'automatizado').should('not.exist');
        cy.get('@btnAlternaList').click();
        cy.contains('h3', 'Itens Arquivados').should('not.exist');
        cy.contains('h2', 'Bancos de dados').should('be.visible');
        cy.contains('tr', 'automatizado').should('be.visible');
    });

    it('Usuário recarrega a tabela e mantem os dados na listagem', () => {
        //intepreto como um botão de refresh, logo o cenário busca atender acreditando essa ser a 
        //funcionalidade correta
        //Bug encontrado: Os dados não persistem após clicar no botão
        cy.contains('button', 'Criar').click();
        cy.contains('h2', 'Adicionar novo item').should('be.visible');
        cy.get('input[placeholder="Nome do item"]').type('automatizado');
        cy.contains('button', 'Salvar').click();
        cy.contains('tr', 'automatizado').should('be.visible');
        cy.contains('button', 'Criar').prev('button') .click();
        cy.contains('tr', 'automatizado').should('be.visible');
        cy.get('tbody tr').should('have.length.at.least', 1);
    });

    it('Usuário tenta cadastrar dois registros iguais', () => {
        //bug encontrado: Permite duplicidade
        const duplicado = 'repetido'

        cy.contains('button', 'Criar').click();
        cy.contains('h2', 'Adicionar novo item').should('be.visible');
        cy.get('input[placeholder="Nome do item"]').type(duplicado);
        cy.contains('button', 'Salvar').click();
        cy.contains('h2', 'Adicionar novo item').should('not.exist');
        cy.contains('button', 'Criar').click();
        cy.get('input[placeholder="Nome do item"]').type(duplicado);
        cy.contains('button', 'Salvar').click();
        cy.get('tbody tr').filter(`:contains("${duplicado}")`).should('have.length', 1);
    });

    it('Usuário verifica se todos os registros são legíveis', () => {
        //Notou-se que a tabela suporta somente alguns registros dependendo da resolução da tela,
        // em meus testes variando o tamanho do monitor, consegui visualizar no maximo 15 registros
        // caso necessário, adaptar linhas 141 e 147 para suprir a quantidade necessária.
        //bug encontrado: Não apresenta todos os registro na tabela por falta de scroll vertical

        for (let i = 1; i <= 15; i++) {
            cy.contains('button', 'Criar').click();
            cy.get('input[placeholder="Nome do item"]').clear().type(`Item-${i}`);
            cy.contains('button', 'Salvar').click();
            cy.contains('h2', 'Adicionar novo item').should('not.exist');
        }
        cy.contains('tr', 'Item-15').should('exist').should('be.visible');
    });
});