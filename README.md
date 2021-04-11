# NextJS Base

> Boilerplate opinativo para projetos usando NextJS e React, escrito em **TypeScript**. Contém mais coisas do que o necessário, escolha o que você precisa apenas.

Este boilerplate tem como base o projeto "default" de `create-next-app`, e foi criado com base em diversos projetos nos quais participei, e contém imports e declarações para uso tanto em aplicações server-side ou client-side.

Coisas neste projeto:
- Carregamento de Markdown usando `frontmatter-markdown-loader`, com `markdown-it` e parsing de emoji :wink:;
- Styled Components, Módulos CSS, etc.;
- Endpoints de API;
- Pronto para export estático (possui exemplo de blog em Markdown e consumo de API, ambos com paginação);

----------------------------------------------------------------------

## Requisitos

- `node` **`v14.x.x`**;

----------------------------------------------------------------------

## Como Usar

- `npm run dev`: executa o projeto em modo de desenvolvimento, uso local apenas;
- `npm run build`: executa o build do projeto, necessário antes de executar o projeto em modo de produçao ou exportar estaticamente;
- `npm start`: executa o projeto em modo de produção, necessário executar o `build` antes;
- `npm run export`: exporta um build estático do projeto;
  - _Rotas para **JSON/XML** e endpoints de API caem fora desse export!_;

----------------------------------------------------------------------

## Autores

Veja `AUTHORS.md` para mais informações.

----------------------------------------------------------------------

## Licença

Este projeto está licenciado sobre a `Licença MIT`. Veja o arquivo `LICENSE.md` para maiores detalhes.

----------------------------------------------------------------------

_©2021 YUITI_
