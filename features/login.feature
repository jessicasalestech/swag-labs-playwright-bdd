# language: pt
Funcionalidade: Login
  Como um usuário do sistema
  Eu quero me autenticar na aplicação
  Para poder acessar o catálogo de produtos

  Contexto:
    Dado que estou na página de login

  Cenário: Login com usuário válido
    Quando informo as credenciais válidas
    Então sou direcionado para a página de produtos

  Cenário: Login de usuário bloqueado falha
    Quando informo o usuário bloqueado
    Então vejo a mensagem de erro de bloqueio

  Cenário: Login com credenciais inválidas falha
    Quando informo um usuário inválido
    Então vejo a mensagem de credenciais inválidas