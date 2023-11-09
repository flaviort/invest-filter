// Function to fetch and display XML data in the existing table
function fetchXmlAndDisplayTableRow(stockName) {
  // Fetch data from your own server with the specified stockName
  const apiUrl = `http://localhost:3001/fetch-data?stockName=${stockName}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Define XPath expressions for each required element
      const xpaths = [
        `/html/body/main/div[2]/div/div[1]/div/div[1]/div/div[1]/strong`,
        `/html/body/main/div[2]/div/div[8]/div[2]/div/div[1]/div/div[2]/div/div/strong`,
        `/html/body/main/div[2]/div/div[8]/div[2]/div/div[4]/div/div[1]/div/div/strong`,
        null, // Null for the line that should be ignored
        `/html/body/main/div[2]/div/div[8]/div[2]/div/div[5]/div/div[1]/div/div/strong`,
        null, // Null for the line that should be ignored
        `/html/body/main/div[5]/div[1]/div/div[2]/div[1]/div/div/strong`,
        `/html/body/main/div[2]/div/div[8]/div[2]/div/div[4]/div/div[3]/div/div/strong`,
        `/html/body/main/div[2]/div/div[8]/div[2]/div/div[1]/div/div[4]/div/div/strong`,
        `/html/body/main/div[2]/div/div[8]/div[2]/div/div[1]/div/div[1]/div/div/strong`,
        `/html/body/main/div[2]/div/div[8]/div[2]/div/div[3]/div/div[4]/div/div/strong`,
        null, // Null for the line that should be ignored
        null // Null for the line that should be ignored
      ];

      // Get the existing tbody element from the HTML table
      const tbody = document.getElementById('stockTable').getElementsByTagName('tbody')[0];

      // Create a new row and cells for each stock
      const row = tbody.insertRow();
      row.classList.add('stock');
      const cellStockName = row.insertCell();

      // Populate the cells with stock name
      cellStockName.textContent = stockName;

      // Populate the cells with XML data based on the defined XPath expressions
      xpaths.forEach((xpath, index) => {
        const cell = row.insertCell();

        if (xpath !== null) {
          // Use a conditional check to display &nbsp; when content is not found
          const element = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          cell.innerHTML = element ? element.textContent.trim() : '&nbsp;';
        } else {
          // Insert a blank cell for null values
          cell.innerHTML = '&nbsp;';
        }
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

// Array of stock names in the desired order
const stockOrder = ['BBAS3', 'EGIE3', 'EQTL3', 'ROXO34', 'TUPY3', 'VALE3', 'VAMO3'];

// Call the function with stocks in the specified order
stockOrder.forEach(stockName => {
  fetchXmlAndDisplayTableRow(stockName);
});

// Function to check and apply "red" class to the second <td> if its value is less than 15
function applyRedClassIfValueLessThan15() {
  // Get all rows in the tbody
  const rows = document.getElementById('stockTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  console.log('Checking rows for red class...');

  // Iterate through each row
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // Check if the row has at least two cells
    if (row.cells.length >= 2) {
      // Get the second <td> in the row
      const secondTd = row.cells[1]; // Index 1 corresponds to the second <td>

      // Check if the second <td> has content
      if (secondTd.textContent.trim() !== '') {
        console.log('Second td content:', secondTd.textContent.trim());

        // Check if the value is less than 15
        const value = parseInt(secondTd.textContent.trim());
        if (!isNaN(value) && value < 15) {
          // Apply the "red" class
          console.log('Applying red class...');
          secondTd.classList.add('red');
        }
      }
    }
  }

  // Set a timeout to run the function again after 10 seconds
  setTimeout(applyRedClassIfValueLessThan15, 10000);
}

// Call the function for the first time
applyRedClassIfValueLessThan15();
