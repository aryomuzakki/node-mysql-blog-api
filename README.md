# Node - MySQL - Blog API

A minimum REST API example for a blog built with Node JS and using MySQL database.

Features:

 - Server using Express JS
 - ORM using Sequelize & migration using sequelize-cli
 - Auth using JWT
 - Database using MySQL

<details>
<summary>

## Table of Content

</summary>

- [Node - MySQL - Blog API](#node---mysql---blog-api)
  - [Table of Content](#table-of-content)
  - [API Docs](#api-docs)
  - [Prerequisite](#prerequisite)
  - [Getting Started](#getting-started)

</details>


## API Docs

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/18452290-d435212f-5de0-4ec7-a893-c97535698474?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D18452290-d435212f-5de0-4ec7-a893-c97535698474%26entityType%3Dcollection%26workspaceId%3Dbd35290f-f417-4115-8d2b-cf3b7850ee00)


## Prerequisite

Before running this project in your local, make sure you have installed [Node JS](https://nodejs.org/en) and [MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html).

## Getting Started 

To run this project in your local environment, follow this steps:

  1. Clone this project

      Create a new folder for this project, then clone this github project using the following command or from downloading the zip file.

      ```bash
      git clone https://github.com/aryomuzakki/node-mysql-blog-api.git node-mysql-blog-api
      ```

      then go to the project folder.

      ```bash
      cd node-mysql-blog-api
      ```

  2. Install dependencies

      Run this command to install required dependencies.

      ```bash
      npm run install
      ```

  3. Create .env file

      Copy paste the `.env.example` file, then rename as `.env`.
      
      You can use the example value or set your own appropriate value.

  4. Create database

      Run this command to create a database, or you can create it manually.

      ```bash
      npm run db:create
      ```

  5. Run migration

      Run this command to generate the required table, I believe you don't want to create table manually :v

      ```bash
      npm run db:migrate
      ```

  6. Run seeder to insert demo data ***(Optional)***

      You can run this command to generate mock data.

      ```bash
      npm run db:seed:all
      ```

---

<div style="text-align: right">
Thank You ❤
</div>