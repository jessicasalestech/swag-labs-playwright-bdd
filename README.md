# 🧪 Swag Labs — Automação de Testes E2E (Playwright + BDD)

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