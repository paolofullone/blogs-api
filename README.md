# Projeto BlogsApi desenvolvido na Trybe durante o curso de formação fullstack em desenvolvimento web.

O objetivo do projeto era construir um backend em `Node.js` capaz de suportar a criação de usuários, login, criação de blog posts e categorias utilizando o ORM `sequelize`.

Os endpoints foram conectados usando os princípios do REST.

Para fazer um post é necessário usuário e login observando a **relação entre** `user` e `post`; 

É necessária a utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.

Os projetos da Trybe são automaticamente avaliados usando o próprio github.

Neste projeto desenvolvemos 15 requisitos obrigatórios e 3 requisitos bônus.

🐋 Projeto desenvolvido utilizando Docker para executar o banco de dados MySQL.

<br />

<details>
  <summary><strong>💻 Instruções para executar o projeto localmente</strong></summary>

1. Clone o repositório
  * `git clone git@github.com:paolofullone/blogs-api.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd blogs-api`

2. Instale as dependências 
  * `npm install`

3. Configure as variáveis de ambiente (arquivo .env.example);

4. Inicialize o container
    * `docker-compose up -d`

A aplicação será executada em um container chamado `blogs_api`. Caso deseje ver os logs do container execute o comando:
    * `docker logs --f blogs_api`

O docker-compose tem uma variável chamada JWT_SECRET que é utilizada para criptografar o token de autenticação. Neste caso passamos JWT_SECRET como valor para fins didáticos.
Neste [site](https://www.md5hashgenerator.com/) pode ser gerado um hash válido para ser utilizado como palavra secreta.

<br />
</details>

<details>
  <summary><strong>🛠 Nota sobre testes </strong></summary>

  Os testes pertencem a Trybe e estão protegidos por privacidade. Foram desenvolvidos pela Trybe e mockam todo o funcionamento do backend, simulando inclusive as querys e retornos do banco de dados.
<br />
</details>



<!-- <details>
  <summary><strong>👀 Dicas</strong></summary>

  #### Status HTTP

</details> -->

<details>
  <summary  id="diagrama"><strong>🎲 Diagrama ER e Entidades</strong></summary>

  #### Diagrama de Entidade-Relacionamento

  Para orientar a construção das tabelas através do ORM, utilizei o *DER* a seguir:

  ![DER](./public/der.png)

  ---
    #### Dicas de scripts prontos

    - Deleta o banco de dados:
    ```json
    "drop": "npx sequelize-cli db:drop"
    ```

    - Cria o banco e gera as tabelas:
    ```json
    "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
    ```

    - Insere dados/Popula a tabela:
    ```json
    "seed": "npx sequelize-cli db:seed:all"
    ```

    **:eyes: OBS**: Os testes irão rodar através do seu migrate usando os scripts acima, também listados no `package.json`.

    **⚠️ Preste bastante atenção, pois a alteração desses scripts pode impedir o avaliador de funcionar corretamente**

    **:warning:️ Haverá um arquivo na pasta `/seeders`, que irá conter as queries para inserção no banco de dados. `Não a remova, pois o avaliador depende dela`.**

<br />
</details>


# Requisitos Obrigatórios

As regras de negócio foram omitidas em função da confidencialidade.

## 1 - Crie migrations para as entidades User, Categories, BlogPosts, PostCategories

<br />

---
## 2 - Crie o modelo 'User' em 'src/database/models/user.js' com as propriedades corretas

---

## 3 - Sua aplicação deve ter o endpoint POST `/login`

---

## 4 - Sua aplicação deve ter o endpoint POST `/user`


---

## 5 - Sua aplicação deve ter o endpoint GET `/user`

---

## 6 - Sua aplicação deve ter o endpoint GET `/user/:id`
---

## 7 - Crie o modelo 'Category' em 'src/database/models/category.js' com as propriedades corretas

---

## 8 - Sua aplicação deve ter o endpoint POST `/categories`

---

## 9 - Sua aplicação deve ter o endpoint GET `/categories`

---

## 10 - Crie o modelo 'BlogPost' em 'src/database/models/blogPost.js' com as propriedades e associações corretas
---

## 11 - Crie o modelo 'PostCategory' em 'src/database/models/postCategory.js' com as propriedades e associações corretas

---

## 12 - Sua aplicação deve ter o endpoint POST `/post`
---

## 13 - Sua aplicação deve ter o endpoint GET `/post`
---

## 14 - Sua aplicação deve ter o endpoint GET `/post/:id`
---

## 15 - Sua aplicação deve ter o endpoint PUT `/post/:id`
---

# Requisitos Bônus

## 16 - Sua aplicação deve ter o endpoint DELETE `/post/:id`


---

## 17 - Sua aplicação deve ter o endpoint DELETE `/user/me`
---

## 18 - Sua aplicação deve ter o endpoint GET `/post/search?q=:searchTerm`

# Autor

<details>
<summary><strong>👨‍⚕️Paolo Enrico Iacono Fullone</strong></summary>

[Linkedin](https://www.linkedin.com/in/paolofullone/)  
[Email](paolo.fullone@gmail.com)

</details>