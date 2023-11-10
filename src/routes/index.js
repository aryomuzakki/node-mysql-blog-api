// const usersRoute = require("./usersRoute");
const { readdirSync, statSync } = require("fs");
const { basename, join } = require("path");

const apiRoutes = require("express").Router();

const readRecursive = (dir) => {
  readdirSync(dir)
    .forEach(async (file) => {
      const filepath = join(dir, file);

      if (statSync(filepath).isDirectory()) {
        readRecursive(filepath);
      } else if (file !== basename(__filename) && file.endsWith(".js") && !file.endsWith('.test.js')) {

        // require all files and use as route
        const route = require(filepath);
        apiRoutes.use(route);
      }
    });
}

readRecursive(__dirname);

module.exports = apiRoutes;