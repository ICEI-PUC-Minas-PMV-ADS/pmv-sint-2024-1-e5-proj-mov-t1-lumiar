# Especificações do Projeto

## Personas

### 1 - Lucas Pinheiro, 17 anos, Estudante em busca de apoio financeiro: 
Lucas é um estudante do ensino médio em rede pública que recebe apoio integral de uma ONG local. Ele sonha em ser médico, mas sua família não tem condições de pagar um cursinho pré-vestibular. Além do apoio emocional e participação em atividades oferecidas pela ONG, Lucas está em busca de alguém que possa custear seu curso preparatório para o vestibular de medicina. Ele está determinado a alcançar seu objetivo e se tornar um médico bem-sucedido. 

### 2 - Juliano, 15 anos, Criança Carente em Busca de Apoio: 
Juliano é um jovem que vive em uma comunidade carente de Belo Horizonte. Ele vem de uma família com recursos financeiros limitados e enfrenta desafios em sua educação. Juliano tem muitos desejos para o futuro, mas sente-se desanimado devido às dificuldades que enfrenta. Ele busca apoio emocional, atividades e mentorias em uma ONG da sua comunidade. 

### 3 - Anne Isabelle, 55 anos, Fundadora de ONG de Assistência Infantil: 
Anne é uma empreendedora que fundou uma ONG voltada para ajudar crianças em situação de vulnerabilidade. Ela é apaixonada por fazer a diferença na vida desses jovens e está constantemente em busca de maneiras de expandir os serviços e recursos oferecidos pela organização. Anne está interessada em parcerias que possam fornecer apoio financeiro e oportunidades educacionais para as crianças atendidas pela ONG. 

### 4 - Edvan Araújo, 31 anos, Engenheiro de produção: 
Edvan é um profissional reconhecido no mercado por sua humildade. Ele teve uma infância simples e sem muitos recursos investidos na sua educação. Atualmente, ele busca instituições que trabalhem com jovens que carecem de recursos educacionais, assim como ele quando menor. Ele está disposto a comprometer uma parte de sua renda mensal para apoiar um ou mais jovens em necessidade. 

### 5 - Marta, 45 anos, Mãe Solidária: 
Marta é uma mãe de dois filhos adolescentes. Ela sempre ensinou seus filhos sobre empatia e solidariedade. Marta está interessada em encontrar oportunidades para sua família se envolver em atividades de caridade e apoio a crianças carentes na sua comunidade, oferecendo apoio financeiro, mentoria e oportunidades de aprendizado. Ela busca uma maneira de tornar essa experiência significativa e educativa para seus próprios filhos, mas não sabe como encontrar uma organização confiável para realizar as doações. 

## Arquitetura e Tecnologias

A arquitetura do projeto segue um modelo de aplicação de três camadas, separando claramente as responsabilidades entre o back end e o front end, proporcionando uma maior modularidade e facilitando a manutenção e o desenvolvimento contínuo.
* Back End: Node.js
* Banco de Dados: MongoDB
* Front End: React Native

## Project Model Canvas

![Project Model Canvas](/documents/img/PMC.png "PMC")

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que padrinho/instituição se cadastre no sistema | ALTA | 
|RF-002| Permitir que padrinho/instituição faça login   | ALTA |
|RF-003| Permitir que padrinho navegue pela lista de instituições  | ALTA |
|RF-004| Permitir que padrinho veja todas as crianças cadastradas na instituição selecionada | ALTA |
|RF-005| Permitir que padrinho veja informações sobre a criança selecionada | MEDIA |
|RF-006| Permitir que padrinho faça apadrinhamento da criança escolhida | ALTA |
|RF-007| Encaminhar padrinho para página de pagamento   | ALTA |
|RF-008| Permitir que padrinho navege pela lista de crianças apadrinhadas   | MEDIA |
|RF-009| Permitir que instituição cadastre crianças para apadrinhamento   | ALTA |
|RF-010| Permitir que instituição edite informações sobre a criança  | MEDIA |
|RF-011| Permitir que a instituição remova a criança da lista | MEDIA |
|RF-012| Permitir que a instituição altere informações sobre ela mesma | MEDIA |
|RF-013| Permitir que a instituição possa ter uma visualização clara das crianças apadrinhadas | BAIXA |
|RF-014| Permitir que a instituição possa ver os usuários que apadrinharam as crianças | BAIXA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O aplicativo deve ser desenvolvido na linguagem Node.js e JS utilizando a biblioteca React Native | ALTA | 
|RNF-002| O aplicativo deve utilizar banco de dados não relacional |  ALTA | 
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

![Diagrama de Caso de Uso](/documents/img/CDU.png "CDU")

## Modelo ER (Projeto Conceitual)
![Group 13](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-apadrinhamento/assets/102738785/7bc66a9d-b55f-4ccd-b0ad-8d718a7cfc2a)


## Projeto da Base de Dados


![Group 14 (1)](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-sint-2024-1-e5-proj-mov-t1-apadrinhamento/assets/102738785/77ec6726-eec3-4b34-b29d-f1dfca0eeac0)



