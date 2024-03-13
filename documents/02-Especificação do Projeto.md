# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Arquitetura e Tecnologias

o	Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

Colocar a imagem do modelo construído apresentando a proposta de solução.

> **Links Úteis**:
> Disponíveis em material de apoio do projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que padrinho/instituição se cadastre no sistema | ALTA | 
|RF-002| Permitir que padrinho/instituição faça login   |  |
|RF-003| Permitir que padrinho navegue pela lista de instituições  |  |
|RF-004| Permitir que padrinho veja todas as crianças cadastradas na instituição selecionada |  |
|RF-005| Permitir que padrinho veja informações sobre a criança selecionada |  |
|RF-006| Permitir que padrinho faça apadrinhamento da criança escolhida |  |
|RF-007| Encaminhar padrinho para página de pagamento   |  |
|RF-008| Permitir que padrinho navege pela lista de crianças apadrinhadas   |  |
|RF-009| Permitir que instituição cadastre crianças para apadrinhamento   |  |
|RF-010| Permitir que instituição edite informações sobre a criança  |  |
|RF-011| Permitir que a instituição remova a criança da lista |  |



### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O aplicativo deve ser desenvolvido na linguagem Node.js e JS utilizando a biblioteca React Native | ALTA | 
|RNF-002| O aplicativo deve utilizar banco de dados relacional |  ALTA | 
|RNF-003| A aplicação deverá ser móvel  |  ALTA | 
|RNF-004| O sistema deve ser flexível e capaz de se adaptar às mudanças nos requisitos e na estrutura organizacional. |  ALTA | 
|RNF-005| O sistema deve ser responsivo para rodar em dispositivos móveis |  MÉDIA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| O projeto deve estar em conformidade com os parâmetros instituídos na LGPD (Lei Geral de Proteção de Dados).    |
|03| O sistema deve ter uma interface amigável e fácil de navegação.  |

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo ER (Projeto Conceitual)

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

Sugestão de ferramentas para geração deste artefato: LucidChart e Draw.io.

A referência abaixo irá auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.
