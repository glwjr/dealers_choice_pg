const express = require('express');
const path = require('path');
const { client, syncAndSeed } = require('./db');
const homePage = require('./views/homePage');
const detailsPage = require('./views/detailsPage');
const aboutPage = require('./views/aboutPage');

const app = express();
const port = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', async(req, res, next) => {
  try {
    const response = await client.query('SELECT * FROM "Show";');
    const shows = response.rows;

    res.send(
      homePage(shows)
    );
  }
  catch(error) {
    next(error);
  }
});

app.get('/shows/:id', async(req, res, next) => {
  try {
    const promises = [
      client.query(`
        SELECT "Show".name 
        FROM "Show" 
        WHERE id=$1;`, 
        [req.params.id]
      ),
      client.query(`
        SELECT "Genre".name 
        FROM "Genre" 
        INNER JOIN "Show" 
        ON "Genre".id = "Show".genre_id 
        WHERE "Show".id=$1;`, 
        [req.params.id]
      ),
      client.query(`
        SELECT "Release Year".year 
        FROM "Release Year" 
        INNER JOIN "Show" 
        ON "Release Year".id = "Show".release_year_id 
        WHERE "Show".id=$1;`, 
        [req.params.id]
      ),
      client.query(`
        SELECT "Origin".name 
        FROM "Origin" 
        INNER JOIN "Show" 
        ON "Origin".id = "Show".origin_id 
        WHERE "Show".id=$1;`, 
        [req.params.id]
      )
    ];

    const [showsResponse, genresResponse, releaseYearResponse, originResponse] = await Promise.all(promises);
    const show = showsResponse.rows[0].name;
    const genre = genresResponse.rows[0].name;
    const releaseYear = releaseYearResponse.rows[0].year;
    const origin = originResponse.rows[0].name;

    res.send(
      detailsPage(show, genre, releaseYear, origin)
    );
  }
  catch(error) {
    next(error);
  }
});

app.get('/about', (req, res, next) => {
  res.send(
    aboutPage()
  );
});

const setUp = async() => {
  try {
    await client.connect();
    await syncAndSeed();
    app.listen(port);
  }
  catch(error) {
    console.log(error);
  }
};

setUp();
