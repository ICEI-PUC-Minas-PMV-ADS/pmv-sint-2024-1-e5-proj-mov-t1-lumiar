# Implantação do Software

•	Apresentar o planejamento da implantação: descrever tecnologias e processo de implantação.

#### Tecnologias Utilizadas
1. **Servidor de Aplicativos**: 
2. **Banco de Dados**: Faremos uso do MongoDB com Mongoose como nosso banco de dados NoSQL.
3. **Controle de Versão**: Utilizaremos o Git e o GitHub para controle de versão e colaboração no código-fonte.
4. **Automação de Implantação**: 
5. **Validação de Dados**: Utilizaremos Zod para validação de dados no lado do servidor.
6. **Testes**: Utilizaremos Jest para escrever e executar testes automatizados.
7. **Autenticação e Criptografia**: Utilizaremos JWT para autenticação e Bcrypt para criptografia de dados.
8. **Servidor Web**: Utilizaremos o Express.js para criar o servidor da nossa aplicação.

#### Descrição dos endpoints: 

| Método | Rota                               | Descrição                                      |
|--------|------------------------------------|------------------------------------------------|
| GET    | /institution                       | Obtém todas as instituições.                   |
| GET    | /institution/:id                   | Obtém uma instituição pelo ID específico.      |
| GET    | /institution/name/:name            | Obtém uma instituição pelo nome específico.   |
| POST   | /institution                       | Cria uma nova instituição.                     |
| POST   | /send-email                        | Envia um email (provavelmente relacionado a uma instituição). |
| POST   | /auth/institution/login            | Autentica o login de uma instituição.          |
| PUT    | /institution/:id                   | Atualiza uma instituição pelo ID específico.   |
| DELETE | /institution/:id                   | Exclui uma instituição pelo ID específico.    |
| GET    | /sponsor/:id                       | Obtém um patrocinador pelo ID específico.     |
| GET    | /sponsor/name/:name                | Obtém um patrocinador pelo nome específico.  |
| GET    | /sponsor                           | Obtém todos os patrocinadores.                |
| POST   | /sponsor                           | Cria um novo patrocinador.                    |
| POST   | /auth/sponsor/login                | Autentica o login de um patrocinador.          |
| PUT    | /sponsor/:id                       | Atualiza um patrocinador pelo ID específico.  |
| DELETE | /sponsor/:id                       | Exclui um patrocinador pelo ID específico.   |
| POST   | /create-donation                   | Cria uma nova doação.                         |
| GET    | /get-donation/sponsor/:id          | Obtém todas as doações por ID específico do patrocinador. |
| GET    | /get-donation/child/:id            | Obtém todas as doações por ID específico da criança. |



•	Apresentar o planejamento de evolução da aplicação.
