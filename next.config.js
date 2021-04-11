require("dotenv/config");

const path = require("path");
const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");
const highlight = require("highlight.js");

// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const { IndexMarkdownFiles } = require("./next.prepare");

IndexMarkdownFiles("blog");

/**
 * next.config
 * ----------------------------------------------------------------------
 * Opções de configuração para o NextJS.
 */
const nextConfig = {};

/**
 * Variáveis de ambientes a serem passadas para a aplicação.
 */
nextConfig.env = {
  RWD_BREAKPOINT_XS: 0,
  RWD_BREAKPOINT_SM: 576,
  RWD_BREAKPOINT_MD: 768,
  RWD_BREAKPOINT_LG: 992,
  RWD_BREAKPOINT_XL: 1200
};

/**
 * Variáveis de ambiente.
 */
nextConfig.env = {
  API_ROOT: process.env.API_ROOT
};

/**
 * Força o export de um `index.html` para cada rota em um build estático..
 */
nextConfig.trailingSlash = true;

/**
 * Define propriedades para uso do componente de imagens nativo do Next.
 *
 * A propriedade `domains` é usada para permitir uso de imagens externas.
 */
nextConfig.images = {
  domains: [
    "images.unsplash.com"
  ]
};

/**
 * Configurações para adoção de features futuras.
 */
nextConfig.future = {
  webpack5: true
};

/**
 * Opções do transpiler de SASS/SCSS.
 *
 * Importante manter o grau de precisão >= 8.
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
    path.resolve("./", "styles")
  ]
};

/**
 * Usado pelo Webpack em background para uso de módulos adicionais e para
 * modificações no processo de build.
 */
nextConfig.webpack = (cfg) => {
  cfg.module.rules.push({
    test: /\.(wav|mp3|mp4|avi|mpg|mpeg|mov|ogg|webm)$/,
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
    test: /\.(png|jpg|jpeg|gif|webp)$/,
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

  // cfg.module.rules.push({
  //   test: /\.(eot|otf|ttf|woff|woff2|svg)$/,
  //   use: {
  //     loader: "file-loader",
  //     options: {
  //       esModule: false,
  //       outputPath: "static/fonts/",
  //       publicPath: "/_next/static/fonts",
  //     }
  //   }
  // });

  cfg.module.rules.push({
    test: /\.md$/,
    loader: "frontmatter-markdown-loader",
    options: {
      markdownIt: markdownIt({
        html: true,
        xhtmlOut: true,
        langPrefix: "language-",
        highlight: (str, lang) => {
          if (lang && highlight.getLanguage(lang)) {
            try {
              return (
                `<pre class="hljs"><code>${highlight.highlight(lang, str, true).value}</code></pre>`
              );
            } catch (__) {
            }
          }

          return (
            `<pre class="hljs"><code>${markdownIt({
              html: true,
              xhtmlOut: true,
              langPrefix: "language-"
            }).utils.escapeHtml(str)}</code></pre>`
          );
        }
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

/**
 *
 */
module.exports = (phase, { defaultConfig }) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   return {
  //   };
  // }

  return Object.assign({}, defaultConfig, nextConfig);
};
