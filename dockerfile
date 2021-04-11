# Define versão do NodeJS
FROM node:12

# Cria pasta do app
WORKDIR /usr/src/app

# Define caminho
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Instala dependências do app
# Use package* usado para garantir que `package.json` e `package-lock.json`
# quando disponível (npm@5+)
COPY package.json ./
#COPY .npmrc ./
#COPY .yarnrc ./

RUN yarn
# Se build for de produção, descomentar
# RUN npm ci --only=production

COPY . ./

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]