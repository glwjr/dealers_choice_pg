const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const { client, syncAndSeed } = require('./db');

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', async(req, res, next) => {
  try {
    const response = await client.query('SELECT * FROM "Show";');
    const shows = response.rows;

    res.send(`
      <html>
        <head>
          <link rel='stylesheet' href='/assets/style.css' />
          <title>Selected TV Shows</title>
        </head>
        <body>
          <div class='container'>
            <div class='header'>
              <nav>
                <a href='/'>Home</a>
                <a href='/about'>About</a>
              </nav>
              <h1>Selected TV Shows</h1>
            </div>
            <ul>
              ${
                shows.map(show => `
                  <li>
                    <a href='/shows/${show.id}'>
                      ${show.name}
                    </a>
                  </li>
                `).join('')
              }
            </ul>
          </div>
        </body>
      </html>
    `);
  }
  catch(err) {
    next(err);
  }
});

app.get('/shows/:id', async(req, res, next) => {
  try {
    const promises = [
      client.query('SELECT * FROM "Show" WHERE id=$1;', [req.params.id]),
      client.query('SELECT "Genre".name FROM "Genre" INNER JOIN "Show" on "Genre".id = "Show".genre_id WHERE "Show".id=$1;', [req.params.id]),
      client.query('SELECT "Release Year".year FROM "Release Year" INNER JOIN "Show" on "Release Year".id = "Show".release_year_id WHERE "Show".id=$1;', [req.params.id]),
      client.query('SELECT "Origin".name FROM "Origin" INNER JOIN "Show" on "Origin".id = "Show".origin_id WHERE "Show".id=$1;', [req.params.id])
    ];

    const [showsResponse, genresResponse, releaseYearResponse, originResponse] = await Promise.all(promises);
    const show = showsResponse.rows[0];
    const genre = genresResponse.rows[0];
    const releaseYear = releaseYearResponse.rows[0];
    const origin = originResponse.rows[0];

    res.send(`
      <html>
        <head>
          <link rel='stylesheet' href='/assets/style.css' />
          <title>Selected TV Shows</title>
        </head>
        <body>
          <div class='container'>
            <div class='header'>
              <nav>
                <a href='/'>Home</a>
                <a href='/about'>About</a>
              </nav>
              <h1>Selected TV Shows</h1>
            </div>
            <ul>
              ${show.name}
              ${genre.name}
              ${releaseYear.year}
              ${origin.name}
            </ul>
          </div>
        </body>
      </html>
    `);
  }
  catch(err) {
    next(err);
  }
});

const setUp = async() => {
  try {
    await client.connect();
    await syncAndSeed();
    app.listen(port);
  }
  catch(err) {
    console.log(err);
  }
};

setUp();
