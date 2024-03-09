## Definição do escopo do projeto 
O projeto consiste em conectar pessoas interessadas em participar de algum projeto social e instituições que promoves estes projetos, criando uma comunicação onde crianças são apadrinhadas com valores mensais e este valor é destinado ao investimento em sua educação, sendo em curso de idiomas, dança, teatro, música etc. O objetivo é promover ações sociais e investir na educação de crianças e jovens da periferia.
As principais funcionalidades são:  
<ul>
  <li> Usuário padrinho se cadastra; </li>
  <li> Usuário padrinho tem acesso a lista de instituições parceiras do projeto; </li>
  <li>Usuário padrinho consegue ver a lista de jovens de cada instituição e realizar o apadrinhamento com valor mensal; </li>
  <li>Usuário padrinho tem acesso a sessão onde pode ver o(s) seu(s) apadrinhado(s) e atualizações geradas pela instituição; </li>
  <li>Usuário instituição se cadastra; </li>
  <li>Usuário instituição adiciona os jovens disponíveis para apadrinhamento no aplicativo, colocando informações básicas e foto (verificar regras sobre direito de imagem infantil);</li>
  <li>Usuário instituição pode realizar atualizações no perfil de cada jovem cadastrado para que o padrinho possa ter um acompanhamento mais próximo; </li>
</ul>

O gerenciamento dos valores dos apadrinhamentos e organização das atividades realizadas para cada jovem apadrinhado é de responsabilidade da instituição, o aplicativo fará a comunicação, mas não faz parte do escopo inicial uma sessão de gerenciamento mais aprofundado.  

## Análise de mercado 
O aplicativo tem caráter social e a intenção de dar início a um projeto que promova o interesse dos usuários a ajudarem na causa da proteção e cuidado aos jovens de periferia ou até mesmo em situação de vulnerabilidade social que buscam por um futuro diferente. Incentivar a educação e a participação ativa das pessoas em causas sociais.  

Ao analisar projetos e softwares que promovem o mesmo, é possível notar muitas semelhanças, principalmente em relação ao propósito geral. Mas a principal diferença é que este projeto visa ser uma ponte entre instituições que não possuem verba para construírem uma plataforma digital e padrinhos que podem ter acesso a uma extensa lista de opções de instituições em um mesmo lugar.  Além de ser uma aplicação para dispositivos móveis, se diferenciando da maioria que é através de sites na web, criando assim uma maior facilidade de acesso tanto para a instituição quanto para o padrinho.

Grande parte dos aplicativos analisados são referentes a um único projeto, e visa arrecadar doações em forma de apadrinhamento para as crianças especificas da instituição dona da plataforma. Contudo, o caráter social, a intenção de aproximar as crianças e jovens dos padrinhos e o objetivo de promover o bem-estar social dos apadrinhados é o mesmo em todas as aplicações.  

###### ChildFund
![ChildFund](/documents/img/CF.png "Child Fund")

###### Fábrica de Sonhos
![Fabrica de Sonhos](/documents/img/FS.png "Fabrica de Sonhos")

# Análise técnica
O aplicativo será um MVP com back-end desenvolvido em Node.js, front-end em React Native por se tratar de uma aplicação móvel e banco de dados relacional utilizando SQL.
O time técnico tem até o dia 23/06 para finalizar o MVP do projeto e entregar as funcionalidades propostas.  

Para que o projeto seja entregue a tempo e de maneira satisfatória, o time usará a metodologia ágil com ciclos adaptativos.  

A arquitetura da aplicação será em camadas, com comunicação cliente > servidor. 

O principal desafio é criar uma aplicação que seja escalável e coesa de modo geral, sem problemas com segurança e usabilidade do usuário. 

# Análise legal e regulatória 
O projeto envolve crianças e jovens e informações pessoais como nome, idade e imagem. Os principais pontos em relação a análise feita, são sobre o Estatuto da Criança e do Adolescente (ECA) e a Lei Geral de Proteção de Dados (LGPD) que preveem total proteção dos dados de crianças e adolescentes e a proibição da sua divulgação sem autorização de seus responsáveis.  

> Art. 17. O direito ao respeito consiste na inviolabilidade da integridade física, psíquica e moral da criança e do adolescente, abrangendo a preservação da imagem, da identidade, da autonomia, dos valores, ideias e crenças, dos espaços e objetos pessoais. 

As instituições devem estar dentro das conformidades da lei em relação ao direito da imagem dos jovens para poderem ingressar e participar do projeto.  

# Tomada de decisão
O time acredita na viabilidade do projeto, sendo possível desenvolver uma aplicação de cunho social que envolva instituições não governamentais e o incentivo a educação de crianças e jovens. Não há intenção de lucros, mas sim de escalar o projeto para que saia do MVP e tenha mais consistência e esteja atrelado as reais demandas das instituições.  

É viável pois estabelece atividades dentro das normas legais, há uma demanda para que a aplicação seja coesa e se diferencia de certa forma dos projetos semelhantes já existentes.  
