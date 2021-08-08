const frontmatter = require("@github-docs/frontmatter");
const fs = require("fs");
const path = require("path");

/**
 * data.prepare
 * ----------------------------------------------------------------------
 * Define utilidades para conteúdo paginável em Markdown, como o blog.
 */

/**
 * Retorna uma versão URL-safe de uma string.
 *
 * @param {string} value
 *     Valor a ser limpo
 * @param {boolean} trim
 *     Se executamos trimming
 * @returns {string}
 */
const toSafeUrlName = (value, trim = false) => {
  let _value = value;

  if (typeof _value !== "string" && _value.toString) {
    _value = _value.toString();
  } else if (!_value.toString) {
    return "";
  }

  if (true === trim) _value = _value.trim();

  return _value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s\s/g, "-")
    .replace(/\s/g, "-");
};

/**
 * Define o nome de um indexador JSON dentro da pasta de dados.
 *
 * Usado para gerar um index para paginação do blog e dados estáticos.
 *
 * @param {string} indexName
 *     Nome do arquivo index, deve ser único na pasta
 * @returns {string}
 * @constructor
 */
const JsonIndex = (indexName = "_index.json") => {
  const dirname = path.resolve(__dirname) + "/data/";
  return `${dirname}${indexName || "_index.json"}`;
};
exports.JsonIndex = JsonIndex;

/**
 * Inicializa o index de paginação de dados estáticos.
 *
 * Cada chave no index deve pertencer à uma collection específica.
 *
 * @param {string} indexName
 *     Nome do arquivo index, deve ser único na pasta `data`
 * @constructor
 */
const JsonIndexInit = (indexName = null) => {
  const filename = JsonIndex(indexName);
  if (!fs.existsSync(filename)) fs.writeFileSync(filename, `{}`);
};
exports.JsonIndexInit = JsonIndexInit;

/**
 * Adiciona uma chave/collection ao index.
 *
 * @param {string} key
 *     Nome da chave a ser adicionada, deve ser única
 * @param {any} data
 *     Dados da collection
 * @param {string} indexName
 *     Nome do arquivo index, deve ser único na pasta `data`
 * @constructor
 */
const JsonIndexWrite = (key, data, indexName = null) => {
  JsonIndexInit(indexName);

  const filename = JsonIndex(indexName);
  const index = require(filename);
  const update = Object.assign({}, index, {
    [key]: data
  });

  fs.writeFileSync(filename, JSON.stringify(update));
};
exports.JsonIndexWrite = JsonIndexWrite;

/**
 * Realiza a leitura de arquivos markdown dentro da pasta `data`, montando o
 * index para paginação e export estático.
 *
 * @param {string} pathname
 *     Pasta com arquivos, dentro de `data`
 * @returns {any[]}
 * @constructor
 */
const IndexMarkdownFiles = (pathname = "") => {
  const dirname = path.resolve(__dirname, "data", pathname || "") + `/`;
  const scandir = fs.readdirSync(dirname);
  const mapped = scandir.map((item, key) => {
    const data = fs.readFileSync(`${dirname + item}`).toString();
    const fm = frontmatter(data);

    const returnable = {
      file: path.basename(item, ".md")
    };

    let id = key + 1;
    if (fm.data.date) {
      let date = new Date(fm.data.date);
      id = date.getTime();
    }
    returnable.id = id;

    return Object.assign({}, returnable, fm.data);
  });

  const used = [];
  for (const item of mapped) {
    if (item.title && !item.slug) {
      const slug = toSafeUrlName(item.title);
      if (!used.includes(slug)) {
        used.push(slug);
        item.slug = slug;
      } else {
        let count = 2;
        let _slug = `${slug}-${count}`;

        if (used.includes(_slug)) {
          while (used.includes(_slug)) {
            count += 1;
            _slug = `${slug}-${count}`;
          }
        }

        used.push(_slug);
        item.slug = _slug;
      }
    }
  }

  JsonIndexWrite(pathname, mapped);

  return mapped;
};
exports.IndexMarkdownFiles = IndexMarkdownFiles;
