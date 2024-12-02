import db from "./db";
import { runMigrations } from "./migrations";

if (require.main === module) {
  initializeDatabase();
}

export function runSeeders() {
  db.prepare("DELETE FROM users").run();
  db.prepare("DELETE FROM cookies").run();

  const insertUser = db.prepare(`
    INSERT INTO users (email, password, name) 
    VALUES (?, ?, ?)
  `);
  insertUser.run("admin@exemplo.com", "senha123", "Administrador");

  const insertCookie = db.prepare(`
    INSERT INTO cookies (name, price, imageUrl) 
    VALUES (?, ?, ?)
  `);
  const cookieSamples = [
    [
      "Chocolate Chip",
      5.0,
      "https://simplelivingrecipes.com/wp-content/uploads/2022/03/fudgy-chocolate-cookies-with-cocoa-powder-s-1.jpg",
    ],
    [
      "Nutella",
      6.5,
      "https://cdn.awsli.com.br/600x450/1898/1898256/produto/239379483/cookie-de-nutella-biscoito-cookie-de-nutella-para-cesta-de-cafe-da-manha-rj-comp-gwvc50t4ay.jpg",
    ],
    ["Morango", 4.75, "https://i.ytimg.com/vi/VD4p56fSkc8/maxresdefault.jpg"],
  ];

  const insertManyCookies = db.transaction((cookies) => {
    for (const cookie of cookies) {
      insertCookie.run(...cookie);
    }
  });

  insertManyCookies(cookieSamples);

  console.log("Seeders completed successfully");
}

export function initializeDatabase() {
  console.log("???");
  runMigrations();
  runSeeders();
}
