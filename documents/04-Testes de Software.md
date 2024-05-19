# Planos de Testes de Software

## Funcionalidades Avaliadas

1. **Cadastro do Usuário Padrinho**: Verificação de campos obrigatórios e redirecionamento após o cadastro.
2. **Cadastro do Usuário Instituição**: Verificação de campos obrigatórios e redirecionamento após o cadastro.
3. **Login do Usuário Padrinho**: Autenticação de usuário e acesso à sua área área.
4. **Login do Usuário Instituição**: Autenticação de usuário e acesso à sua área área.

## Ferramentas Utilizadas para a realização dos testes:

- Trello para gerenciamento e rastreamento de bugs;
- Aplicativo móvel do Expo.

## Cenários de Testes

Os cenários de testes apresentados a seguir foram selecionados para garantir que os requisitos da aplicação sejam satisfeitos. Cada cenário descreve uma funcionalidade específica da aplicação e como será validada por meio de testes.

### 01. Cadastro do Usuário Padrinho

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** | O Sistema deve dispor de uma tela para cadastro do usuário do tipo padrinho, onde será informado nome, e-mail, CPF, data de nascimento, senha e confirmação da senha.|
| **Objetivo:** | Verificar se o sistema permite o cadastro de um usuário do tipo padrinho corretamente. |
| **Passos para Execução:** | 1. Acesse a página de cadastro; <br> 2. Preencha os campos obrigatórios: nome, e-mail, senha, CPF, data de nascimento, senha e confirmação da senha; <br> 3. Clique no botão "Cadastrar".| 
| **Resultados Esperados:** | - O sistema deve realizar o cadastro do usuário informado. <br> - O usuário será redirecionado para a área de apadrinhamento, que informa a lista de crianças disponiveis para apadrinhar.|
| **Grupo de Usuários:** | Pessoa física não registrada no Lumiar. |



### 02. Cadastro do Usuário Instituição

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** | O Sistema deve dispor de uma tela para cadastro do usuário do tipo instituição, onde será informado nome da instituição, e-mail, CNPJ, senha e confirmação da senha.|
| **Objetivo:** | Verificar se o sistema permite o cadastro de um usuário do tipo instituição corretamente. |
| **Passos para Execução:** | 1. Acesse a página de cadastro; <br> 2. Preencha os campos obrigatórios: nome da instituição, e-mail, CNPJ, senha e confirmação da senha; <br> 3. Clique no botão "Cadastrar".| 
| **Resultados Esperados:** | - O sistema deve realizar o cadastro da instituição informada. <br> - O usuário será redirecionado para o mural de listagem de crianças.|
| **Grupo de Usuários:** | Instituição não registrada no Lumiar. |

