import express from 'express';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/fetch-data', async (req, res) => {
  try {
    const externalUrl = 'https://www.fundamentus.com.br/resultado.php';
    
    const response = await fetch(externalUrl);
    const html = await response.text({ encoding: 'utf-8' });

    // Use JSDOM to parse the HTML and extract data
    const { document } = new JSDOM(html).window;

    // Extract the content of the table with id "resultado"
    const tableContent = document.querySelector('table#resultado');

    if (!tableContent) {
      throw new Error('Table with id "resultado" not found.');
    }

    // Send the table content as the response
    res.send(tableContent.outerHTML);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at https://invest-filter.vercel.app:${port}`);
});
