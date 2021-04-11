# NextJS Base

_**IMPORTANTE**: este branch contém a versão anterior, mantendo apenas para arquivamento. Tive problemas com o repositório e tive de recriá-lo, apenas para referência._

> Boilerplate opinativo para projetos usando NextJS e React, escrito em **TypeScript**. Contém mais coisas do que o necessário, escolha o que você precisa apenas.

Este boilerplate tem como base o projeto "default" de `create-next-app`, e foi criado com base em diversos projetos nos quais participei, e contém imports e declarações para uso tanto em aplicações server-side ou client-side.

De tudo o que tem neste projeto, é opcional:
- [X] Carregamento de Markdown com `frontmatter-markdown-loader`, com `markdown-it` custom para formatação de emojis :wink:;
- [X] Módulos CSS
- [X] Usar `styled-components`;
- [X] Rotas personalizadas para XML e JSON (Feeds);
- [X] Endpoints de API;
- [X] Pré-carregamento de dados, inclusive com paginação, para export de website estático;
- [X] Modelo de blog em Markdown, com suporte a paginação;
- [X] Uso de `redux` para controle de fluxo e estado;
- [X] ICU para renderização de datas localizadas em SSR;
- [ ] Múltiplas configurações de ambiente usando `gulp` (_WIP_);

Tem mais coisa além do descrito? Tem. Tem mais coisa do que precisa? Tem, mas aí sinta-se livre para deixar de lado e excluir o que não precisa.

----------------------------------------------------------------------

## Requisitos

- `node` **`v12.x.x`**;

----------------------------------------------------------------------

## Como Usar

- `npm run dev`: executa o projeto em modo de desenvolvimento, uso local apenas;
- `npm run build`: executa o build do projeto, necessário antes de executar o projeto em modo de produçao ou exportar estaticamente;
- `npm start`: executa o projeto em modo de produção, necessário executar o `build` antes;
- `npm run export`: exporta um build estático do projeto;
  - _Rotas para **JSON/XML** e endpoints de API caem fora desse export!_;

----------------------------------------------------------------------

## Você disse...Blog? Em Markdown?

O blog exemplo em Markdown utiliza a pasta `data/blog` para armazenar os posts.

Cada post deve ter, em seu _frontmatter_ os atributos `title` e `date`, `tags` é opcional.

Logo na primeira execução, seja em `build` ou `dev`, o arquivo `next.config.js` cria um índice na raiz do projeto (`_index.json`), que é usado para armazenar não apenas o blog, mas qualquer estrutura similar.

Este índice é, posteriormente, importado pelo React via a classe `MdBlogService` para carregamento de posts e paginação client-side.

Esta forma foi a qual encontrei para atender todos os aspectos do projeto, assim como evitar o uso de módulos nativos do node para carregamento de arquivos. :v:

----------------------------------------------------------------------

## Docker

Esta feature ainda é experimental, mas você pode executar este projeto usando Docker.

Para isto, caso tenha Docker instalado, execute o comando de build da imagem: 

```
docker build -t nextjs-base .
```

E depois basta executar o app:

```
docker run -p 3030:3000 -d nextjs-base
```

A flag `p` redireciona uma porta pública para uma interna do container, enquanto a flag `-d` define o nome do container a ser inicializado.

Alguns comandos do docker:

- `docker ps -a`: retorna uma lista dos containers em execução;
- `docker stop [id]`: para a execução de um container;
- `docker rm [id]`: remove um container;
- `docker logs [id]`: imprime o output de um app;
- `docker exec -it [id] /bin/bash`: entra no container;

Lembrando que pode ser necessário parar, remover e montar novamente a imagem do container, caso modificações sejam feitas.

----------------------------------------------------------------------

## Autores

Veja `AUTHORS.md` para mais informações.

----------------------------------------------------------------------

## Licença

Este projeto está licenciado sobre a `Licença MIT`. Veja o arquivo `LICENSE.md` para maiores detalhes.

----------------------------------------------------------------------

_©2020 YUITI_
