# 👋 Bem-vindo ao Backend!

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![Node](https://img.shields.io/badge/node-v22.12.0-green.svg) ![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow.svg)

> Este é o backend de um projeto que está em desenvolvimento para fazer um ***[Full App]***, construído com **Node.js, Docker, PostgreSQL e estruturado com boas práticas de Clean Architecture + TypeScript.**

---

## 📁 Estrutura do Projeto

```py
.
├── dist/ # Código compilado (build)
├── src/ # Código-fonte principal (entrypoint: src/main.ts)
├── docker-compose.yml # Orquestração de containers
├── Dockerfile # Imagem da aplicação Node.js
├── package.json # Configuração das dependências
├── tsconfig.json # Configuração do TypeScript
├── tsup.config.ts # Configuração do empacotador TSUP
├── drizzle.config.ts # Configuração do ORM Drizzle
└── biome.json # Configuração de lint e formatação

```
---

## 🛠 Tecnologias Utilizadas

-  **Node.js v22.12.0**
-  **PostgreSQL** via [Bitnami Docker Image](https://hub.docker.com/r/bitnami/postgresql)
-  **Docker & Docker Compose**
-  **TypeScript**
-  **Tsup** (empacotador)
-  **Drizzle ORM**
-  **Biome** (lint + format)

---
## Instalação 

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passos para subir o projeto

```bash
# Clonar o repositório
git clone https://github.com/joseplinio/Backend-Node.js.git

# Acessar a pasta do projeto
cd Backend-Node.js

# Instalar as dependências
npm i 

# Subir os serviços
docker-compose up --build

# Subir as tabele

```
### Crie um arquivo .env
```bash
# No repositorio
cp .env.txt .env

# Exemplo (.env):

# Database (drizzle)
DATABASE_URL = postgres://xxxx:xxxx@db:5432/xxxx

# Docker-compose
POSTGRESQL_USERNAME = xxxx
POSTGRESQL_PASSWORD = yyyy
POSTGRESQL_DATABASE = zzzz

# Aplication
PORT = wwww
```

## 📦 Scripts principais
```bash
# Subir as tabelas
npx drizzle-kit push

# Ver as tabeles
npx drizzle-kit studio
```
## Final 
- Bom é isso espero que goste do meu projeto ;] (Thanks @Sofia, @Mare)