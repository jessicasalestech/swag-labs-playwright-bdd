# 🧪 Swag Labs — Automação de Testes E2E (Playwright + BDD)

[![CI Status](https://github.com/jessicasalestech/swag-labs-playwright-bdd/actions/workflows/ci.yml/badge.svg)](https://github.com/jessicasalestech/swag-labs-playwright-bdd/actions/workflows/ci.yml)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![BDD](https://img.shields.io/badge/BDD-Gherkin_pt--BR-6DB33F)
![Allure](https://img.shields.io/badge/Allure_Report-2E9EFC)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

Projeto de **portfólio de QA** que demonstra um framework completo de automação de testes
fim-a-fim (UI), aplicado ao app demo **[Swag Labs](https://www.saucedemo.com)** (Sauce Labs).

> App de treinamento, estável e público — ideal para demonstrar o framework de forma
> reproduzível e independente.

## 🚀 Stack

| Tecnologia | Uso |
| --- | --- |
| **Playwright** (`1.6x`) | Automação de navegador (Chromium e Firefox) |
| **TypeScript** (strict) | Tipagem segura do código de teste |
| **playwright-bdd** (`9.x`) | Escrever cenários em **Gherkin pt-BR** e executar com o runner do Playwright |
| **Page Objects (POM)** | Reutilização e isolamento dos seletores |
| **Allure Report** | Relatório rico com evidências (steps, screenshots, histórico) |
| **GitHub Actions** | CI: executa a suíte, gera relatórios e publica artefatos |

## 📁 Estrutura do projeto

```
.
├── features/            # Cenários BDD em Gherkin pt-BR
│   ├── login.feature
│   ├── inventory.feature
│   └── checkout.feature
├── steps/               # Step definitions (ligam Gherkin ao código)
├── fixtures/            # Fixtures estendidas + Page Objects injetados
├── src/pages/           # Page Objects (Login, Inventory, Cart, Checkout)
├── support/             # Configuração de ambiente (.env)
├── .github/workflows/   # CI (Playwright + Allure)
└── playwright.config.ts # Configuração do Playwright + playwright-bdd
```

## ✅ O que é coberto

- **Login** — sucesso, usuário bloqueado e credenciais inválidas (validação de mensagem de erro).
- **Catálogo** — adicionar produtos ao carrinho (contagem no badge) e ordenação por preço.
- **Checkout** — fluxo completo de compra até a confirmação do pedido.

## 📸 Evidências

Capturas de tela geradas automaticamente no final de cada cenário:

| | |
|---|---|
| ![Login com sucesso](docs/evidencias/01-login-sucesso.png) | ![Login usuário bloqueado](docs/evidencias/02-login-usuario-bloqueado.png) |
| ![Login credenciais inválidas](docs/evidencias/03-login-credenciais-invalidas.png) | ![Catálogo: adicionar produto](docs/evidencias/04-catalogo-adicionar-produto.png) |
| ![Catálogo: múltiplos produtos](docs/evidencias/05-catalogo-multiplos-produtos.png) | ![Catálogo: ordenação por preço](docs/evidencias/06-catalogo-ordenacao.png) |
| ![Checkout: compra com sucesso](docs/evidencias/07-checkout-compra-sucesso.png) | — |

> 💡 As evidências são capturadas por um fixture automático (`autoScreenshot`), então
> qualquer novo cenário passa a gerar sua evidência sem esforço adicional.

## 🔧 Pré-requisitos

- Node.js **≥ 20.10**
- npm

## ▶️ Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Instalar navegadores (Chromium; Firefox opcional)
npm run install:browsers

# 3. Copiar o environment (valores padrão já apontam para o app demo)
cp .env.example .env

# 4. Executar a suíte (Chromium e Firefox)
npm run test

# Executar apenas o Chromium
npx playwright test --project=chromium

# Executar um cenário específico (pesquisa pelo título)
npx playwright test --project=chromium --grep "Login com sucesso"
```

### Relatórios

```bash
# HTML do Playwright (abre interativo)
npm run report

# Relatório Allure
npm run allure:report    # gera a partir de allure-results/
npm run allure:open      # abre no navegador
```

### 🌐 Relatório online (GitHub Pages)

O CI publica o **Allure Report** no GitHub Pages a cada push, com link navegável:

**🔗 https://jessicasalestech.github.io/swag-labs-playwright-bdd/**

Sem instalar nada: é atualizado automaticamente pela pipeline (`actions/deploy-pages`).

## 🤖 CI (GitHub Actions)

Na pipeline (`ci.yml`), a suíte roda em **Chromium e Firefox**, e em caso de falha são
publicados como artefatos: relatório HTML do Playwright, **Allure Report** e **traces**
(para debug de falhas).

## 💡 Boas práticas aplicadas

- **Page Objects** — seletores centralizados e reutilizáveis, sem hardcoded no teste.
- **Gherkin pt-BR** — cenários legíveis por PO/Devs/QA sem saber automação.
- **Credenciais via `.env`** — nada de senha/dado pessoal no repositório
  (`.env.example` é a referência versionada; `.env` é ignorado).
- **Robustez** — `workers: 1` + retry de navegação mitigam flakiness de rede do app demo.
- **Config determinística** — sem IA/self-healing em runtime, apenas seletores estáveis.

## 🛡️ Segurança

- O app alvo é um **demo público** (dados fictícios).
- `PASSWORD` e credenciais **não** são versionadas — vêm de `.env` / secrets de CI.

---

**Autoria:** Jessica Sales · QA