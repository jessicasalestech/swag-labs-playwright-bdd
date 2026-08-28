# language: pt
Funcionalidade: Checkout
  Como um usuário autenticado
  Eu quero finalizar a compra dos produtos do meu carrinho
  Para receber a confirmação do meu pedido

  Contexto:
    Dado que estou logado na aplicação
    E adiciono o produto "Sauce Labs Backpack" ao carrinho
    E acessei o carrinho de compras

  Cenário: Realizar uma compra com sucesso
    Quando inicio o checkout
    E informo os dados do cliente
    E finalizo a compra
    Então vejo a mensagem de pedido confirmado