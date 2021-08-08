require("dotenv/config");

const hljs = require("highlight.js");
const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");
const path = require("path");

// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const { IndexMarkdownFiles } = require("./data.prepare");

IndexMarkdownFiles("blog");

/**
 * Diretório de trabalho atual.
 *
 * @type {string}
 */
const WORK_DIR = process.cwd();

/**
 * next.config
 * ----------------------------------------------------------------------
 * Objeto de configurações do Next.
 */
const nextConfig = {};

/**
 * Ativa React Strict Mode.
 *
 * Recomendável manter como `true`, o uso de `false` aqui é apenas para evitar
 * warnings no console.
 */
nextConfig.reactStrictMode = false;

/**
 * Variáveis de ambiente a serem passadas para a aplicação.
 */
nextConfig.env = {
  API_ROOT: (typeof process.env.VERCEL_URL !== "undefined")
    ? `https://${process.env.VERCEL_URL}`
    : process.env.API_ROOT,
  RWD_BREAKPOINT_XS: 0,
  RWD_BREAKPOINT_SM: 576,
  RWD_BREAKPOINT_MD: 768,
  RWD_BREAKPOINT_LG: 992,
  RWD_BREAKPOINT_XL: 1200
};

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
    path.resolve(WORK_DIR, "styles")
  ],
  // Oculta "DEPRECATION WARNING" do SASS
  quietDeps: true
};

/**
 * Força o export de um `index.html` para cada rota em um build estático..
 */
nextConfig.trailingSlash = true;

/**
 * Usado pelo Webpack em background para uso de módulos adicionais e para
 * modificações no processo de build.
 */
nextConfig.webpack = (config) => {
  config.module.rules.push({
    test: /\.(eot|otf|ttf|woff|woff2)$/,
    use: {
      loader: "file-loader",
      options: {
        name: "[hash:16].[ext]",
        esModule: false,
        outputPath: "static/fonts/",
        publicPath: "/_next/static/fonts",
      },
    },
  });

  config.module.rules.push({
    test: /\.(png|jpe?g|gif|webp|svg)$/,
    use: {
      loader: "file-loader",
      options: {
        name: "[hash:16].[ext]",
        esModule: false,
        outputPath: "static/img/",
        publicPath: "/_next/static/img",
      },
    },
  });

  config.module.rules.push({
    test: /\.(wav|mp3|mp4|avi|mpg|mpeg|mov|ogg|webm)$/,
    use: {
      loader: "file-loader",
      options: {
        name: "[hash:16].[ext]",
        esModule: false,
        outputPath: "static/media/",
        publicPath: "/_next/static/media",
      },
    },
  });

  config.module.rules.push({
    test: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/,
    use: {
      loader: "file-loader",
      options: {
        name: "[hash:16].[ext]",
        esModule: false,
        outputPath: "static/data/",
        publicPath: "/_next/static/data",
      },
    },
  });

  config.module.rules.push({
    test: /\.md$/,
    loader: "frontmatter-markdown-loader",
    options: {
      markdownIt: markdownIt({
        html: true,
        xhtmlOut: true,
        langPrefix: "language-",
        highlight: (str, lang) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                `<pre class="hljs"><code>${hljs.highlight(
                  str,
                  {
                    language: lang,
                    ignoreIllegals: true
                  }
                ).value}</code></pre>`
              );
            } catch (__) {
              console.log("Nothing to catch here.");
            }
          }

          return (
            `<pre class="hljs"><code>${markdownIt({
              html: true,
              xhtmlOut: true,
              langPrefix: "language-"
            }).utils.escapeHtml(str)}</code></pre>`
          );
        },
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
    },
  });

  /*
    Nos permite importar qualquer módulo tendo a raíz como referência.

    A ideia é evitar imports usando "../../../" (ad infinitum).
   */
  config.resolve.modules.push(
    path.resolve("./")
  );

  return config;
};

/**
 * Reforça o uso de Webpack 5.
 */
nextConfig.webpack5 = true;

module.exports = (phase, { defaultConfig }) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   return {
  //   };
  // }

  return Object.assign({}, defaultConfig, nextConfig);
};
