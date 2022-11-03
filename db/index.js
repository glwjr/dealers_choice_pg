const pg = require('pg');
const client = new pg.Client('postgres://localhost/dealers_choice_pg');

const syncAndSeed = async() => {
  const SQL = `
    DROP TABLE IF EXISTS "Show";
    DROP TABLE IF EXISTS "Genre";
    DROP TABLE IF EXISTS "Release Year";
    DROP TABLE IF EXISTS "Origin";

    CREATE TABLE "Genre"(
      id INTEGER PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );

    CREATE TABLE "Release Year"(
      id INTEGER PRIMARY KEY,
      year INTEGER NOT NULL
    );

    CREATE TABLE "Origin"(
      id INTEGER PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );
    
    CREATE TABLE "Show"(
      id INTEGER PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      genre_id INTEGER REFERENCES "Genre"(id),
      release_year_id INTEGER REFERENCES "Release Year"(id),
      origin_id INTEGER REFERENCES "Origin"(id)
    );

    INSERT INTO "Genre"(id, name) VALUES(1, 'Fantasy');
    INSERT INTO "Genre"(id, name) VALUES(2, 'Drama');
    INSERT INTO "Genre"(id, name) VALUES(3, 'Action');

    INSERT INTO "Release Year"(id, year) VALUES(1, 2017);
    INSERT INTO "Release Year"(id, year) VALUES(2, 2018);
    INSERT INTO "Release Year"(id, year) VALUES(3, 2019);
    INSERT INTO "Release Year"(id, year) VALUES(4, 2020);
    INSERT INTO "Release Year"(id, year) VALUES(5, 2021);
    INSERT INTO "Release Year"(id, year) VALUES(6, 2022);

    INSERT INTO "Origin"(id, name) VALUES(1, 'United States');
    INSERT INTO "Origin"(id, name) VALUES(2, 'Japan');

    INSERT INTO "Show"(id, name, genre_id, release_year_id, origin_id) 
      VALUES(1, 'House of the Dragon', 1, 6, 1);

    INSERT INTO "Show"(id, name, genre_id, release_year_id, origin_id) 
      VALUES(2, 'Power Book III: Raising Kanan', 2, 5, 1);

    INSERT INTO "Show"(id, name, genre_id, release_year_id, origin_id) 
      VALUES(3, 'Tokyo Revengers', 3, 1, 2);
  `;

  await client.query(SQL);
};

module.exports = {
  client,
  syncAndSeed
};