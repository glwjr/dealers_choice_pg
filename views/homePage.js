const homePage = (shows) => {
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
};

module.exports = homePage;
