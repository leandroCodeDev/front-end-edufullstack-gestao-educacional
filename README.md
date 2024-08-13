# Educação FullStack - Sistema de Gestão Educacional

## introdução

O Educação FullStack é um sistema web de gestão educacional desenvolvido como parte do projeto avaliativo 2 do módulo 2. Este sistema proporciona funcionalidades essenciais para a administração de instituições educacionais, permitindo o cadastro de turmas, avaliações, docentes e alunos, além de oferecer recursos para alocação de professores, gerenciamento de notas e controle de acesso dos usuários. Desenvolvido utilizando Angular 18, o Educação FullStack emprega tecnologias modernas e práticas de desenvolvimento, incluindo TypeScript, HTML e SCSS e GitHub para versionamento do código. Além disso, a metodologia de desenvolvimento utiliza o Kanban no Trello para organização das tarefas, garantindo uma abordagem ágil e eficiente. O sistema atende a uma variedade de papéis de usuários, como administradores, docentes e alunos, cada um com suas permissões específicas de acesso e funcionalidades disponíveis. Com uma arquitetura sólida e uma implementação cuidadosa das regras de negócio, o Educação FullStack é uma solução completa para a gestão educacional, proporcionando uma experiência experiencia de usúario e eficaz para todas as partes envolvidas no processo educativo.


## Tecnologias Utilizadas

- Angular
- TypeScript
- HTML
- CSS/SCSS

## Ferramentas Utilizadas

- Visual Studio Code
- Trello

## Documentos uteis
- [Dashboard Módulo 2 - Projeto Avaliativo](https://trello.com/b/LsBKQGGy/modulo-2-projeto-avaliativo)
- [Documento de requisitos do projeto](https://docs.google.com/document/d/e/2PACX-1vS6cfVygMK6Wr1NnwHjAUq6HRwilGVD7f4cFDs2OUJYN97FbYt54NHY1At1RJhZeURVXzxp92MLf_oo/pub)



## Pré-Requisitos
- Node 20 ou superior
- Angular 18 ou superior
- JSON Server
- Moment.js

## Como Começar

### Clonando o Repositório

```
git clone https://github.com/leandroCodeDev/front-end-edufullstack-gestao-educacional
```
###  Acessando diretorio do projeto

```
cd front-end-edufullstack-gestao-educacional
```

### Instalando o Projeto

```
npm install
```

### Executar o Backend

Abra outro terminal, digite o comando abaixo:

```
npm run db
```

O servidor de Backend fica disponivel na url [localhost:3000](localhost:3000)

### Executar o Frontend

Abra um segundo terminal e digite o comando abaixo:

```
npm run start
```
O servidor de Frontend fica disponivel na url [localhost:4222](localhost:4222)

### Acessando o projeto

Para acessar a aplicação basta acessar a url [localhost:3000](localhost:3000) e voce sera diurecionado para a pagina de login.

### Observações

Como o projeto apresenta os dados mockados todos os dados são iterdependete dele caso realizer alguma ação de exclusão de registro restaure o arquivo de ``src/data-base/db.json``.


## Perfis

Atualmente a aplicação conta com 3 perfis de acesso sendo eles:
- Perfil 1
  - **Login** admin 
  - **Senha** admin
- Perfil 1
  - **Login** docente 
  - **Senha** docente
- Perfil 1
  - **Login** aluno
  - **Senha** aluno



## Roteiro da Aplicação

Possuir as seguintes páginas e funcionalidades:

- Login
- Menu Lateral
- Toolbar
- Início (Dashboard)
- Cadastro/Edição de Docente
- Cadastro/Edição de Alunos
- Cadastro de Turmas
- Cadastro de Notas
- Listagem de Docentes
- Listagem de Avaliações

Todos as regras de negócio encontram-se no **[Documento de requisitos do projeto](https://docs.google.com/document/d/e/2PACX-1vS6cfVygMK6Wr1NnwHjAUq6HRwilGVD7f4cFDs2OUJYN97FbYt54NHY1At1RJhZeURVXzxp92MLf_oo/pub)**.


# Pontos de melhorias

- Melhorar UI das páginas;
- Melhorar a navegabilidade entre as páginas;
- Melhorar o sitemas de toast;
- Melhorar o sitemas de loading;
- Troca/melhorar biblioteca de componentes de UI;
- Corrigir regras de negócio que estão incorretas (Exclusão de alunos);
- Integrar a um servidor de BackEnd para que os dados sejam salvos em um banco de dados e possibilite uma melhor experiência do usuário ao usar o sistema;
- Integrar os cadastros de docente e de aluno com o sistema de login para possibilitar a realização do login com o dados cadastraos pelo perfil admin.
