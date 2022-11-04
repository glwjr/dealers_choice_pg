const renderDetailsPage = (show, genre, releaseYear, origin) => {
  return(`
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
            <h1><a href='/'>Selected TV Shows</a></h1>
          </div>
          <ul>
            <li><span class="bold">${show}</span></li>
            <li><span class="bold">Genre: </span>${genre}</li>
            <li><span class="bold">Release Year: </span>${releaseYear}</li>
            <li><span class="bold">Origin: </span>${origin}</li>
          </ul>
        </div>
      </body>
    </html>
  `);
};

module.exports = renderDetailsPage;
