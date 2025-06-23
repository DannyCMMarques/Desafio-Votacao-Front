# 🗳️ Front-end de Votação Cooperativa

Esta é a versão **front-end** responsiva, construída com React e TypeScript, de uma solução de votação para cooperativas. Consome a API desenvolvida em Java/Spring Boot:
https://github.com/DannyCMMarques/desafio-votacao-spring-java

---

## 📋 Descrição

- Ao acessar o site, o usuário vê todas as pautas cadastradas em uma lista com paginação, incluindo título e descrição.  
- É possível criar, editar e deletar pautas, além de visualizar detalhes e resultados de votações.  
- No menu lateral, em **Sessões**, o usuário encontra todas as sessões registradas com seus status.  
  - Criar nova sessão, informando o código da pauta e duração.  
  - Iniciar, editar e excluir sessões.  
  - Visualizar detalhes da pauta associada e status atual.  
- Ao clicar em **Votar** em um card de pauta ou **Participar** no card de sessão, o usuário será redirecionado para uma página de votação:  
  - Vê informações da pauta, tempo restante (contagem regressiva) e estatísticas de votação.  
  - Confere lista de associados que já votaram.  
  - Emite seu voto (`Sim`/`Não`). Se não estiver logado, o site solicita CPF, verifica cadastro, e caso não esteja cadastrado, realiza cadastro e simula login (mantém ID no `localStorage` até o usuário clicar em “Sair” e utiliza React Context) para evitar solicitar CPF a cada voto.

> ⚙️ Para facilitar o uso e testes, foi criado um **seed com pautas** e um **seed com 10 associados** prontos para votar:

```sql
INSERT INTO associados (nome, cpf) VALUES
('Ana Paula Ferreira',       '12345678901'),
('Bruno Martins da Silva',   '23456789012'),
('Carlos Henrique Souza',    '34567890123'),
('Daniela Lopes Andrade',    '45678901234'),
('Eduardo Lima Costa',       '56789012345'),
('Fernanda Rocha Mendes',    '67890123456'),
('Gabriel Vieira Ramos',     '78901234567'),
('Helena Castro Oliveira',   '89012345678'),
('Igor Matos Barreto',       '90123456789'),
('Juliana Torres Almeida',   '01234567890');
```

---

## 🛠 Tecnologias

- **React**  
- **TypeScript**  
- **React Router DOM** (navegação)  
- **Axios** (requisições HTTP)  
- **React Hook Form** + **Zod** (validação de formulários)  
- **React Toastify** (toasts para melhor experiência do usuário)  
- **react-timer-hook** (contagem regressiva)  
- **react-icons** (ícones)  
- **react-tooltip** (tooltips mobile)  
- **Tailwind CSS** (estilização) – [Documentação](https://tailwindcss.com/docs/installation/using-vite)  
- **Vitest** + **@testing-library/react** (testes unitários)

---

## 📸 Capturas de Tela


---

## 💻 Como Rodar Localmente

1. **Back-end** (API)  
   ```bash
   git clone https://github.com/DannyCMMarques/desafio-votacao-spring-java.git
   cd desafio-votacao-spring-java
   docker-compose build
   docker-compose up
   ```
2. **Front-end**  
   ```bash
   git clone https://github.com/DannyCMMarques/Desafio-Votacao-Front.git
   cd Desafio-Votacao-Front
   npm install
   npm run dev
   ```
3. Abra no navegador: `http://localhost:5173`

---

## ✅ Testes

- Executar todos os testes:  
  ```bash
  npm run test
  ```
- Gerar relatório de cobertura:  
  ```bash
  npm run test:coverage
  ```

---

## 📄 Licença

Este projeto está licenciado sob a **MIT**. Veja [LICENSE](LICENSE) para detalhes.
