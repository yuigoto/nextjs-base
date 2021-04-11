const axios           = require("axios");
const path            = require("path");
const markdownIt      = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");

const { loadUsers, markdownParse } = require("./next.request.js");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/**
 * Este passo é necessário para que tenhamos o index gerado do lado do servidor
 * durante o processo de build.
 */
(() => {
  markdownParse("data/blog");
})();

/**
 * next.config
 * ----------------------------------------------------------------------
 * Arquivo de configuração do NextJS.
 *
 * Utilize para personalizar o seu build.
 *
 * @since     0.0.1
 */
const nextConfig = {};

/**
 * Transcreve variáveis de ambiente de `.env` para a aplicação.
 * 
 * @type {*}
 */
nextConfig.env = {};

/**
 * Define propriedades para uso do componente de imagens nativo do Next.
 * 
 * A propriedade `domains` é usada para permitir uso de imagens externas.
 * 
 * @type {*}
 */
nextConfig.images = {
  domains: [
    "images.unsplash.com"
  ]
};

/**
 * Responsável por mapear para exportação, quando realizamos export estático.
 *
 * Se alguma roda dinâmica precisa de pré-carregamento de dados, faça isso
 * aqui nesta rota.
 *
 * Dependendo do tamanho, cabe colocar em arquivo externo.
 *
 * @param {*} defaultPathMap 
 *     Mapeamendo de caminhos padrão do Next
 * @param {*} options 
 *     Objeto com opções adicionais
 * @returns {Object}
 */
nextConfig.exportPathMap = async (
  defaultPathMap,
  { dev, dir, outDir, distDir, buildId }
) => {
  let routesData = {};
  
  let blog = markdownParse("data/blog");
      blog = blog.sort((a, b) => {
        return b.date - a.date;
      }),
      blogPagesCount = Math.ceil(blog.length / 5);

  /*
    Esta função auxiliar carrega usuários e páginas de usuários.
    
    Da mesma forma você pode carregar postagens.
   */
  let userList = await loadUsers();
      
  for (let n = 0; n < blogPagesCount; n++) {
    let start = n * 5,
        finish = start + 5,
        posts = blog.slice(start, finish);
        slugList = posts.map((item) => item.slug);
        
    if (n === 0) {
      routesData[`/blog`] = {
        page: `/blog`,
        query: {
          posts: slugList,
          page: n + 1,
          totalPages: blogPagesCount
        }
      };
    }
    
    routesData[`/blog/page/${n+1}`] = {
      page: `/blog/page/[page]`,
      query: {
        posts: slugList,
        page: n + 1,
        totalPages: blogPagesCount
      }
    };
  }
  
  for (let post of blog) {
    routesData[`/blog/${post.slug}`] = {
      page: `/blog/[slug]`,
      query: {
        ...post
      }
    };
  }
  
  // Loop de rotas de páginas
  for (let page of Object.keys(userList.pages)) {
    if (page < 2) {
      // Fallback para quando não houver `pageId`
      routesData[`/users`] = {
        page: `/users`,
        query: { ...userList.pages[page] }
      };
    }
    
    routesData[`/users/${page}`] = {
      page: `/users/[pageId]`,
      query: { ...userList.pages[page] }
    };
  }
  
  // Loop de rotas de usuários individuais
  for (let user of Object.keys(userList.users)) {
    routesData[`/users/user/${userList.users[user].id}`] = {
      page: `/users/user/[userId]`,
      query: {
        userId: user,
        user: userList.users[user]
      }
    };
  }
  
  return Object.assign({}, defaultPathMap, routesData);
};

/**
 * Opções do transpiler de SASS/SCSS.
 *
 * Importante manter o grau de precisão >= 8.
 * 
 * @type {Object}
 */
nextConfig.sassOptions = {
  precision: 8,
  outputStyle: "compressed",
  sourceComments: false,
  includePaths: [
    /*
      Esta configuração nos permite importar qualquer arquivo dentro da pasta
      `scss`, mesmo dentro de um módulo, sem ter de usar relativos (`../../`).
     */
    path.resolve("./", "scss")
  ]
};

/**
 * Usado pelo Webpack em background para uso de módulos adicionais e para 
 * modificações no processo de build.
 * 
 * @param {*} cfg 
 *     Objeto de configuração do Webpack
 * @returns {*}
 *     Objeto de configuração modificado
 */
nextConfig.webpack = (cfg) => {
  cfg.module.rules.push({
    test: /\.(wav|mp3|mp4|avi|mpg|mpeg|mov|ogg)$/,
    use: {
      loader: "file-loader",
      options: {
        esModule: false,
        outputPath: "static/media/",
        publicPath: "/_next/static/media",
      }
    }
  });

  cfg.module.rules.push({
    test: /\.(png|jpg|jpeg|gif)$/,
    use: {
      loader: "file-loader",
      options: {
        esModule: false,
        outputPath: "static/img/",
        publicPath: "/_next/static/img",
      }
    }
  });

  cfg.module.rules.push({
    test: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/,
    use: {
      loader: "file-loader",
      options: {
        esModule: false,
        outputPath: "static/data/",
        publicPath: "/_next/static/data",
      }
    }
  });

  cfg.module.rules.push({
    test: /\.(eot|otf|ttf|woff|woff2|svg)$/,
    use: {
      loader: "file-loader",
      options: {
        esModule: false,
        outputPath: "static/fonts/",
        publicPath: "/_next/static/fonts",
      }
    }
  });

  cfg.module.rules.push({
    test: /\.md$/,
    loader: "frontmatter-markdown-loader",
    options: {
      markdownIt: markdownIt({
        html: true,
        xhtmlOut: true,
        langPrefix: "language-"
      }).use(markdownItEmoji),
      mode: [
        "html",
        "body",
        "meta",
        "react-component"
      ],
      react: {
        root: "markdown-content"
      }
    }
  });

  /*
    Nos permite importar qualquer módulo tendo a raíz como referência.

    A ideia é evitar imports usando "../../../" (ad infinitum).
   */
  cfg.resolve.modules.push(path.resolve("./"));

  return cfg;
};

module.exports = (phase, { defaultConfig }) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   return {
  //   };
  // }

  return Object.assign({}, defaultConfig, nextConfig);
};
