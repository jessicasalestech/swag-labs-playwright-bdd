# language: pt
Funcionalidade: Catálogo de produtos
  Como um usuário autenticado
  Eu quero visualizar e manipular os produtos do catálogo
  Para poder montar o meu pedido

  Contexto:
    Dado que estou logado na aplicação

  Cenário: Adicionar produto ao carrinho
    Quando adiciono o produto "Sauce Labs Backpack" ao carrinho
    Então a contagem do carrinho é 1

  Cenário: Adicionar múltiplos produtos ao carrinho
    Quando adiciono o produto "Sauce Labs Backpack" ao carrinho
    E adiciono o produto "Sauce Labs Bike Light" ao carrinho
    Então a contagem do carrinho é 2

  Cenário: Ordenar produtos por preço (menor para maior)
    Quando ordeno os produtos por "Price (low to high)"
    Então o primeiro produto é "Sauce Labs Onesie"