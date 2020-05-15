# Planner-Back-end

## Não mexer
Por favor não mexa na pasta lambda do projeto pois nela se encontram as configurações necessárias para a comunicação com a api feita através do aws lambda e api gateway.

## Stack Back-end
O Back-end web desse projeto segue uma arquitetura em camadas simples;
1. Presentation: responsável pela comunicação com agentes externos (como o Frontend)
1. Data: responsável pela comunicação direta com o banco de dados
1. Business: responsável pela lógica de negócio
Por fim, ressalta-se que a comunicação da camada `Data` e a `Business` é feita através de interfaces denominadas `Gateway`, para possibilitar os testes unitários desta última camada (inversão de dependências)

## Linguagens e serviços utilizadas Back-end
Typescript, Aws Ec2 virtual machine, Serviço serverless Aws Lambda, Aws api-gateway, Express, cors, JWT, banco de dados mysql, gerenciadores de pacotes do Nodejs: yarn e npm.

## Sobre
Projeto back-end do tipo Crud: Create, Read, Update e Delete. Planner é um planejador semanal onde você pode armazenar suas tarefas, ver suas tarefas deletar elas e atualizar elas.

## Instruções para rodar
Por ser um projeto com ReactJS, há a necessidade do NodeJS. Com ele em sua máquina, basta abrir o terminal e navegar até o repositório clonado e rodar:
1. `npm install` ou `yarn` para instalar todas as dependências;
1. `npm run start` ou `yarn start` para rodar localmente o projeto
1. `npm run build` ou `yarn build` para gerar uma versão estática do projeto (que ficará na pasta `build`)

## Links
Esses links servem para acessar os endpoint do back-end.

AWS API-Gateway: https://rsxqac02u2.execute-api.us-east-1.amazonaws.com/Planner

Postman: https://documenter.getpostman.com/view/9731771/Szmk1FZH

## Contato
Nome: Brian de Paula Mello

Linkedin: https://www.linkedin.com/in/brian-de-paula-mello-6b8577161/

Email: brianmmello@gmail.com

Celular: (21) 98268-1935
