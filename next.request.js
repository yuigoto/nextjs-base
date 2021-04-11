const axios = require("axios");
const frontmatter = require("@github-docs/frontmatter");
const fs = require("fs");
const path = require("path");
const log = console.log;

/**
 * next.request
 * ----------------------------------------------------------------------
 * Exporta funções que executam requests de API para pré-carregamento
 * ao exportar o projeto estaticamente.
 *
 * Devem ser usadas em conjunto com `exportPathMap` em `next.config`.
 *
 * @since     0.0.1
 */

const indexInit = () => {
  let dirname = path.resolve(__dirname) + `\\`;
  
  if (!fs.existsSync(`${dirname}_index.json`)) {
    fs.writeFileSync(`${dirname}_index.json`, `{}`);
  }
};

const indexWrite = (key, data) => {
  indexInit();
  
  let dirname = path.resolve(__dirname) + `\\`,
      index = require(`${dirname}_index.json`),
      update = Object.assign(
        {},
        index,
        {
          [key]: data
        }
      );
  fs.writeFileSync(`${dirname}_index.json`, JSON.stringify(update));
};

/**
 * Realiza a leitura de arquivos markdown em uma pasta, busca o frontmatter 
 * neles e retorna um array com os mesmos.
 * 
 * @param {string} pathname 
 *     Caminho do arquivo para verificação
 * @returns {Array}
 */
const markdownParse = (pathname = "") => {
  let dirname = path.resolve(__dirname, pathname || "") + `/`,
      scan = fs.readdirSync(dirname),
      name = scan.map(item => path.basename(item, ".md")),
      list = [];
      
  indexWrite(pathname, name);
  
  if (scan.length > 0) {
    for (let file of scan) {
      let filepath = dirname + file;
      if (fs.lstatSync(filepath).isFile()) {
        let md = fs.readFileSync(filepath).toString(),
            nm = path.basename(file, ".md"),
            fm = frontmatter(md);
        
        list.push(
          Object.assign(
            {},
            { slug: nm },
            fm.data
          )
        );
      }
    }
  }
  
  return list;
};
exports.markdownParse = markdownParse;

/**
 * Carrega posts/usuarios de teste, tanto paginação quanto perfis individuais.
 * 
 * Faz o pré-carregamento focando em export estático.
 * 
 * @returns {Array}
 */
const loadUsers = async () => {
  let page = 1,
      request = await axios.get(`https://reqres.in/api/users?per_page=3&page=${page}`),
      pages = {},
      ids = [], 
      users = {};
  
  if (request.status === 200 && request.data) {
    pages[page] = {
      pageId: page,
      totalPages: request.data.total_pages, 
      users: request.data.data
    };
    
    for (let user of request.data.data) {
      ids.push(user.id);
    }
    
    if (request.data.total_pages > page) {
      for (let p = page + 1; p <= request.data.total_pages; p++) {
        request = await axios.get(`https://reqres.in/api/users?per_page=3&page=${p}`);
        pages[p] = {
          pageId: p,
          totalPages: request.data.total_pages, 
          users: request.data.data
        };
    
        for (let user of request.data.data) {
          ids.push(user.id);
        }
      }
    }
  }
  
  for (let id of ids) {
    request = await axios.get(`https://reqres.in/api/users/${id}`);
    if (request.status === 200) {
      users[id] = request.data.data;
    }
  }
  
  return {
    pages,
    users
  };
};

exports.loadUsers = loadUsers;
