const cheerio = require('cheerio');

(async function decodingSecret(URL = 'https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub') {
  try {
    const $ = await cheerio.fromURL(URL);
    const data = $.extract({
      p: ['td > p:gt(2)']
    });
    let xMax = 0, yMax = 0;
    const dataFormatted = [];
    for (let i = 0; i < data.p.length; i+=3) {
      if (data.p[i] > xMax) xMax = data.p[i];
      if (data.p[i + 2] > yMax) yMax = data.p[i + 2];
      let dataObj = {
        x: data.p[i],f
        y: data.p[i + 2],
        unicode: data.p[i + 1]
      };
      dataFormatted.push(dataObj);
    }

    let grid = [];

    for (let i = 0; i <= yMax; i++) {
      let row = [];
      for (let j = 0; j <= xMax; j++) {
        row.push(' ');
      }
      grid.push(row);
    };

    for (let i = 0; i < dataFormatted.length; i++) {
      grid[dataFormatted[i].y][dataFormatted[i].x] = dataFormatted[i].unicode;
    };

    grid.reverse();

    printGrid(grid);
  } catch (error) {
    console.error('Error parsing the given URL:', error);
  }
})();

function printGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''));
  }
  return grid;
}

//decodingSecret("https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub");
