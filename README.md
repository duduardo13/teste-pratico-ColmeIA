# 🚀 Desafio Técnico - Analista de Testes (ColmeIA)

Este projeto contém a automação de testes *End-to-End* (E2E) desenvolvida para o processo seletivo da **ColmeIA**. O objetivo foi validar as funcionalidades críticas da plataforma, garantindo a integridade dos dados e a qualidade da experiência do usuário.

---

### 🛠️ Tecnologias Utilizadas
* **Framework:** [Cypress](https://www.cypress.io/)
* **Linguagem:** JavaScript / Node.js
* **Segurança:** Uso de `.gitignore` para proteção de credenciais e `fixtures` para massa de dados.

---

### 📋 Cenários Automatizados

O projeto cobre fluxos essenciais de negócio, tais como:
* **Autenticação:** Login com tratamento de erros e sucesso.
* **CRUD de Bancos de Dados:** Cadastro, listagem, refresh e exclusão.
* **Organização:** Arquivamento e filtros de busca.
* **Navegação:** Interações com menu lateral e menus de perfil.

---

### 🐛 Relatório de Bugs Identificados (QA Report)

Durante a execução da automação, foram identificadas inconformidades críticas que impactam a regra de negócio e a usabilidade. Os testes foram configurados para evidenciar estas falhas:

#### **Autenticação e Acesso**
* **Falha no Login:** O sistema exibe mensagem de erro ("Credenciais incorretas") mesmo ao inserir dados válidos presentes nas fixtures.
* **Falha Esqueci a senha:** O sistema não redireciona para página de recuperação de senha.
* **Menu do Usuário:** O dropdown de perfil (botão "Candidato") não é renderizado após o clique, impedindo o acesso a configurações e logout.

#### **Funcionalidades e Regras de Negócio**
* **Duplicidade de Dados:** O sistema permite o cadastro de múltiplos registros com o mesmo nome, ignorando a restrição de unicidade.
* **Falha no Arquivamento:** A ação de arquivar não remove o registro da listagem principal nem o transfere para a aba de itens arquivados.
* **Persistência pós-Refresh:** Ao utilizar o botão de atualizar da listagem, os dados recém-cadastrados desaparecem da tela (limpeza indevida do estado).

#### **Interface e Layout (UI/UX)**
* **Limite de Visibilidade:** Após o 8º cadastro, o 9º registro existe no DOM (HTML), mas não fica visível para o usuário (erro de overflow ou layout).
* **Navegação Lateral:** O menu lateral não executa a ação de "fechar" (toggle off) após ser aberto, permanecendo fixo na tela.

---

### ⚙️ Como executar os testes

1. **Instalar dependências:**
   ```bash
   npm install
