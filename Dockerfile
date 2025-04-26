# Dockerfile - Frontend

FROM node:20

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY package*.json ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src

# Instala as dependências
RUN npm install

# Builda a aplicação
RUN npm run build

# Instala um servidor de arquivos estáticos
RUN npm install -g serve

# Expõe a porta
EXPOSE 3000

# Serve o frontend
CMD ["serve", "-s", "build", "-l", "3000"]
