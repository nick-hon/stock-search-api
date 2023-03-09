const express = require('express');
const request = require('request');
const port = 3000;

const app = express();

app.get('/stocks/:query', (req, res) => {
  const query = req.params.query;
  const url = `https://finance.yahoo.com/_finance_doubledown/api/resource/searchassist;searchTerm=${query}`;

  request(url, (err, response, body) => {
    if (err) {
      res.status(500).send({ error: 'Unable to search for stocks' });
    } else {
      const data = JSON.parse(body);
      if (!data.items || data.items.length === 0) {
        res.status(404).send({ error: 'No stocks found' });
      } else {
        const stocks = data.items.map((item) => ({
          symbol: item.symbol,
          name: item.name,
        }));
        res.send(stocks);
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port :${port}`);
});
