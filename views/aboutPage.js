const aboutPage = () => {
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
            <h1>About</h1>
          </div>
          <ul>
            <li><span class="bold">Created By: </span>Gary White</li>
            <li><span class="bold">Program: </span>Fullstack Academy</li>
            <li><span class="bold">Year: </span>2022</li>
          </ul>
        </div>
      </body>
    </html>
  `);
};

module.exports = aboutPage;
