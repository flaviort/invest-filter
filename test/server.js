import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/fetch-data', async (req, res) => {
  try {
    const stockName = req.query.stockName || 'bbas3'; // Default to 'bbas3' if stockName is not provided
    const externalUrl = `https://statusinvest.com.br/acoes/${stockName}`;
    
    const response = await fetch(externalUrl);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
