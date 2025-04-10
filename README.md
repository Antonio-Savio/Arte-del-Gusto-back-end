# Arte Del Gusto - Back-End

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-393.svg?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000.svg?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)
[![Vercel](https://img.shields.io/badge/Vercel-000000.svg?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

## 💡 Sobre

Este repositório contém a **API back-end** para o sistema de gerenciamento da delicatessen **Arte Del Gusto**. Construída com Node.js, Express e TypeScript, esta API robusta serve como o motor lógico central, lidando com gerenciamento de dados, regras de negócio e autenticação tanto para o [painel de administração web](https://github.com/Antonio-Savio/Arte-del-Gusto-front-end) quanto para o [aplicativo móvel](https://github.com/Antonio-Savio/Arte-del-Gusto-mobile) utilizado pela equipe.

O sistema facilita o gerenciamento eficiente de usuários, categorias de produtos, produtos (incluindo upload de imagens) e o ciclo de vida completo dos pedidos, desde a criação até a conclusão.

---

## 💻 Visão geral
https://github.com/user-attachments/assets/e4fba1e0-ff3a-41b4-90c3-bb70704df398

<img src="./src/assets/arte-del-gusto.gif" alt="gif mostrando funcionalidades do Arte del Gusto">

---

## 🔗 Repositórios Relacionados
-   **Front-End (Painel Web):** [https://github.com/Antonio-Savio/Arte-del-Gusto-front-end](https://github.com/Antonio-Savio/Arte-del-Gusto-front-end)
-   **Aplicativo Móvel:** [https://github.com/Antonio-Savio/Arte-del-Gusto-mobile](https://github.com/Antonio-Savio/Arte-del-Gusto-mobile)

## 🌐 API em funcionamento
- [https://arte-del-gusto-back-end.vercel.app](https://arte-del-gusto-back-end.vercel.app)

---

## ✨ Funcionalidades Principais e Destaques Arquiteturais

*   **Design de API RESTful:** Endpoints limpos e previsíveis para gerenciamento de recursos.
*   **TypeScript:** Tipagem forte para maior qualidade de código, manutenibilidade e experiência do desenvolvedor.
*   **Prisma ORM:** Toolkit moderno para banco de dados para interação perfeita, migrações e segurança de tipos.
*   **Autenticação JWT:** Autenticação segura de usuários usando JSON Web Tokens, gerenciada via middleware (`checkAuth.ts`).
*   **Autorização por Middleware:** Garante que apenas usuários autenticados possam acessar rotas protegidas.
*   **Separação de Responsabilidades:** Camadas bem definidas para controllers, services e middlewares, promovendo modularidade e testabilidade.
*   **Migrações de Banco de Dados:** Gerenciadas pelo Prisma, garantindo evolução consistente do schema do banco de dados entre ambientes.
*   **Manipulação de Imagens:** Integração com Multer para upload de arquivos e Cloudinary para armazenamento e entrega de imagens na nuvem (ex: banners de produtos).
*   **Tratamento de Erros Assíncronos:** Usa `express-async-errors` para um tratamento mais limpo de operações assíncronas nas rotas Express.
*   **Configuração CORS:** Cross-Origin Resource Sharing devidamente configurado para comunicação segura com clientes front-end.
*   **Variáveis de Ambiente:** Gerenciamento seguro de configurações sensíveis usando `dotenv`.
*   **Pronto para Deploy:** Configurado para fácil implantação na Vercel (`vercel.json`, script `vercel-build`).

---

## ⚙️ Tecnologias Utilizadas

*   **Ambiente de Execução:** Node.js
*   **Framework:** Express.js
*   **Linguagem:** TypeScript
*   **ORM:** Prisma
*   **Banco de Dados:** PostgreSQL
*   **Autenticação:** bcryptjs (Hashing de Senha), jsonwebtoken (JWT)
*   **Upload de Arquivos:** Multer
*   **Armazenamento em Nuvem:** Cloudinary
*   **Implantação:** Vercel

---

## 🗺️ Endpoints da API

*Autenticação (`checkAuth`) necessária para rotas marcadas com `(auth)`.*

**Usuários (User)**
*   `POST /users` - Cria uma nova conta de usuário (requer `name`, `email` e `password` no **corpo da requisição**).
*   `POST /session` - Autentica um usuário (requer `email` e `password` no **corpo da requisição**) e retorna um token JWT e dados do usuário.
*   `GET /userinfo` - Obtém detalhes do usuário atualmente autenticado. `(auth)`

**Categorias (Category)**
*   `POST /category` - Cria uma nova categoria de produto (requer `name` no **corpo da requisição**). `(auth)`
*   `GET /category` - Lista todas as categorias de produtos. `(auth)`
*   `DELETE /category` - Deleta uma categoria (requer `category_id` como query parameter). `(auth)`

**Produtos (Product)**
*   `POST /product` - Cria um novo produto (requer `name`, `price`, `description`, `category_id`, e opcionalmente dados do arquivo/banner no **corpo da requisição** - o formato depende se o `multer` está ativo ou não). `(auth)`
*   `GET /category/product` - Lista produtos por categoria (requer `category_id` como query parameter). `(auth)`
*   `DELETE /product` - Deleta um produto (requer `product_id` como query parameter). `(auth)`

**Pedidos (Order)**
*   `POST /order` - Cria um novo pedido em rascunho (requer `table` e opcionalmente `name` no corpo da requisição). `(auth)`
*   `DELETE /order` - Deleta um pedido inteiro (requer `order_id` como query parameter). `(auth)`
*   `POST /order/add` - Adiciona um item a um pedido existente (requer `order_id`, `product_id`, `amount` no corpo da requisição). `(auth)`
*   `DELETE /order/remove` - Remove um item de um pedido (requer `item_id` como query parameter). `(auth)`
*   `PUT /order/send` - Atualiza o status de um pedido para enviado/em andamento (requer `order_id` no corpo da requisição ou query parameter). `(auth)`
*   `GET /orders` - Lista todos os pedidos que não estão em rascunho (status enviado ou concluído). `(auth)`
*   `GET /order/detail` - Obtém informações detalhadas e itens de um pedido específico (requer `order_id` como query parameter). `(auth)`
*   `PUT /order/conclude` - Atualiza o status de um pedido para finalizado/concluído (requer `order_id` no corpo da requisição ou query parameter). `(auth)`

---

## 📁 Estrutura do Projeto

```
├── prisma/                # Configuração do Prisma ORM
│   ├── migrations/        # Histórico de migrações do banco de dados
│   └── schema.prisma      # Definição do schema do banco de dados
├── src/                   # Código fonte
│   ├── @types/            # Tipagem personalizada - extensão do Request do Express
│   ├── config/            # Configuração do Multer
│   ├── controllers/       # Manipuladores de requisição, interagem com os services
│   ├── middlewares/       # Middleware do Express - verificação de autenticação
│   ├── prisma/            # Instância do cliente Prisma
│   ├── services/          # Implementação da lógica de negócio
│   ├── routes.ts          # Definições das rotas da API
│   └── server.ts          # Configuração e inicialização do servidor Express
├── tsconfig.json          # Opções do compilador TypeScript
├── vercel.json            # Configuração de deploy da Vercel
```

---

## 🚀 Como Executar Localmente

### **Pré-requisitos**

*   Node.js (v16 ou superior recomendado)
*   Yarn (ou NPM)
*   Git
*   Uma instância de PostgreSQL compatível com Prisma em execução
*   Conta no Cloudinary (para upload de imagens)

### **Instalação**

```bash
# 1. Clone o repositório
git clone https://github.com/Antonio-Savio/Arte-del-Gusto-back-end.git

# 2. Navegue até o diretório do projeto
cd Arte-del-Gusto-back-end

# 3. Instale as dependências
yarn install
# ou
npm install
```

### **Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis, substituindo os valores de exemplo pelas suas credenciais reais:

```env
# URL de Conexão do Banco de Dados
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Chave Secreta JWT
JWT_SECRET="SEU_SEGREDO_JWT_ALEATORIO"

# Credenciais do Cloudinary
CLOUDINARY_NAME="SEU_CLOUDINARY_NAME"
CLOUDINARY_KEY="SUA_CLOUDINARY_KEY"
CLOUDINARY_SECRET="SEU_CLOUDINARY_SECRET"

# Porta do Servidor
# PORT=3333
```

### **Configuração do Banco de Dados**

Certifique-se de que seu servidor de banco de dados esteja em execução e acessível com as credenciais fornecidas no `.env`. Em seguida, execute as migrações do Prisma para configurar o schema:

```bash
# Aplica as migrações para criar as tabelas do banco de dados
yarn prisma migrate dev
# ou
npx prisma migrate dev
```

### **Executando o Servidor de Desenvolvimento**

```bash
yarn dev
# ou
npm run dev
```

A API deve estar rodando em `http://localhost:3333`.

---

## 💾 Migrações do Banco de Dados

Alterações no schema do banco de dados são gerenciadas usando o Prisma Migrate.

*   **`prisma/schema.prisma`**: Define os modelos e relações do banco de dados.
*   **`prisma/migrations`**: Contém arquivos SQL gerados para cada etapa de migração.

**Comandos Principais:**
*   `yarn prisma migrate dev`: Aplica migrações durante o desenvolvimento (cria o BD se necessário, aplica migrações pendentes).
*   `yarn prisma migrate deploy`: Aplica migrações em ambientes de produção/staging.
*   `yarn prisma generate`: Atualiza o Prisma Client com base no schema.

---

## ☁️ Implantação / Deploy

Este projeto está configurado para implantação na Vercel.

*   O arquivo `vercel.json` fornece a configuração básica.
*   O script `vercel-build` no `package.json` (`"tsc --build && prisma generate && prisma migrate deploy"`) lida com o processo de build:
    1.  Compila TypeScript para JavaScript.
    2.  Gera o Prisma Client.
    3.  Aplica as migrações do banco de dados.

Certifique-se de que suas variáveis de ambiente (`DATABASE_URL`, `JWT_SECRET`, chaves do Cloudinary) estejam corretamente configuradas nas configurações do seu projeto na Vercel.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, siga estes passos:

1.  Faça um fork do projeto.
2.  Crie uma nova branch (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e commit (`git commit -m 'feat: Adiciona nova feature incrível'`).
4.  Faça push para a branch (`git push origin feature/sua-feature`).
5.  Abra um Pull Request.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes (se existir, caso contrário, declare que é MIT).

---

## 📧 Contato

Antonio Sávio
*   **Email:** [savio.aragao@hotmail.com](mailto:savio.aragao@hotmail.com)
*   **GitHub:** [Antonio-Savio](https://github.com/Antonio-Savio)
*   **LinkedIn:** [antonio-savio](https://www.linkedin.com/in/antonio-savio)
