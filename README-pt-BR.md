# 🧪 Swag Labs — Automação de Testes E2E (Playwright + BDD)

[![Português](https://img.shields.io/badge/Portugu%C3%AAs-green?style=plastic&logo=openbadges&logoColor=white)](README-pt-BR.md) [![English](https://img.shields.io/badge/English-blue?style=plastic&logo=openbadges&logoColor=white)](README.md)

[![CI Status](https://github.com/jessicasalestech/swag-labs-playwright-bdd/actions/workflows/ci.yml/badge.svg)](https://github.com/jessicasalestech/swag-labs-playwright-bdd/actions/workflows/ci.yml)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![BDD](https://img.shields.io/badge/BDD-Gherkin_pt--BR-6DB33F)
![Allure](https://img.shields.io/badge/Allure_Report-2E9EFC)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

Um **projeto de portfólio de QA** demonstrando um framework completo de automação
de testes de ponta a ponta (UI), aplicado ao app de demonstração
**[Swag Labs](https://www.saucedemo.com)** (Sauce Labs).

> Um aplicativo de treinamento público e estável — ideal para mostrar o framework
> de forma reprodutível e autocontida.

## 🚀 Stack

| Tecnologia | Uso |
| --- | --- |
| **Playwright** (`1.6x`) | Automação de navegador (Chromium e Firefox) |
| **TypeScript** (strict) | Tipagem segura para o código de testes |
| **playwright-bdd** (`9.x`) | Escrever cenários em **Gherkin pt-BR** e executá-los com o runner do Playwright |
| **Page Objects (POM)** | Reuso de seletores e isolamento |
| **Allure Report** | Relatório rico com evidências (passos, screenshots, histórico) |
| **GitHub Actions** | CI: executa a suíte, gera relatórios e publica artefatos |

## 📁 Estrutura do projeto

```
.
├── features/            # cenários BDD em Gherkin pt-BR
│   ├── login.feature
│   ├── inventory.feature
│   └── checkout.feature
├── steps/               # step definitions (ligam o Gherkin ao código)
├── fixtures/            # fixtures estendidas + Page Objects injetados
├── src/pages/           # Page Objects (Login, Inventory, Cart, Checkout)
├── support/             # configuração de ambiente (.env)
├── .github/workflows/   # CI (Playwright + Allure)
└── playwright.config.ts # config do Playwright + playwright-bdd
```

## ✅ O que é coberto

- **Login** — sucesso, usuário bloqueado (locked-out) e credenciais inválidas (validação de mensagem de erro).
- **Catálogo** — adicionar produtos ao carrinho (contador de badge) e ordenar por preço.
- **Checkout** — fluxo completo de compra até a confirmação do pedido.

## 📸 Evidências

Screenshots capturados automaticamente ao final de cada cenário:

| | |
|---|---|
| ![Login success](docs/evidencias/01-login-sucesso.png) | ![Login locked-out user](docs/evidencias/02-login-usuario-bloqueado.png) |
| ![Login invalid credentials](docs/evidencias/03-login-credenciais-invalidas.png) | ![Catalog: add product](docs/evidencias/04-catalogo-adicionar-produto.png) |
| ![Catalog: multiple products](docs/evidencias/05-catalogo-multiplos-produtos.png) | ![Catalog: sorting](docs/evidencias/06-catalogo-ordenacao.png) |
| ![Checkout: successful purchase](docs/evidencias/07-checkout-compra-sucesso.png) | — |

> 💡 As evidências são capturadas por um fixture automático (`autoScreenshot`),
> então qualquer novo cenário gera seu próprio screenshot sem esforço extra.

## 🔧 Pré-requisitos

- Node.js **≥ 20.10**
- npm

## ▶️ Como executar

```bash
# 1. Instale as dependências
npm install

# 2. Instale os navegadores (Chromium; Firefox opcional)
npm run install:browsers

# 3. Copie o ambiente (os padrões já apontam para o app demo)
cp .env.example .env

# 4. Execute a suíte (Chromium e Firefox)
npm run test

# Execute apenas o Chromium
npx playwright test --project=chromium

# Execute um cenário específico (busca por título)
npx playwright test --project=chromium --grep "Login com sucesso"
```

### Relatórios

```bash
# Playwright HTML (abre interativo)
npm run report

# Relatório Allure
npm run allure:report    # gera a partir de allure-results/
npm run allure:open      # abre no navegador
```

### 🌐 Relatório online (GitHub Pages)

O CI publica o **Allure Report** no GitHub Pages a cada push:

**🔗 https://jessicasalestech.github.io/swag-labs-playwright-bdd/**

Nada para instalar: é atualizado automaticamente pelo pipeline (`actions/deploy-pages`).

## 🤖 CI (GitHub Actions)

No pipeline (`ci.yml`), a suíte executa em **Chromium e Firefox**. Em caso de
falha, estes são publicados como artefatos: relatório HTML do Playwright,
**Allure Report** e **traces** (para depuração de falhas).

## 💡 Boas práticas aplicadas

- **Page Objects** — seletores centralizados e reutilizáveis, sem hardcoding nos testes.
- **Gherkin pt-BR** — cenários legíveis por PO/Dev/QA sem conhecimento de automação.
- **Credenciais via `.env`** — nenhuma senha/dado pessoal no repositório
  (`.env.example` é a referência versionada; `.env` é ignorado).
- **Robustez** — `workers: 1` + retry de navegação mitigam a flakiness de rede do app demo.
- **Config determinística** — sem IA/self-healing em runtime, apenas seletores estáveis.

## 🛡️ Segurança

- O app de destino é uma **demo pública** (dados fictícios).
- `PASSWORD` e credenciais **não** são versionadas — vêm de `.env` / segredos do CI.

---

**Autor:** Jessica Sales · QA