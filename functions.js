// Function to fetch and display HTML data in the existing table
function fetchHtmlAndDisplayTable() {
  // Fetch data from your own server
  fetch('http://localhost:3001/fetch-data')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(tableHtml => {
      // Create a temporary div element to parse the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = tableHtml;

      // Update the content of the existing table with the fetched HTML
      document.getElementById('stockTable').innerHTML = tempDiv.innerHTML;
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

// Call the function to fetch and display the HTML content
fetchHtmlAndDisplayTable();

// hide companies with PL below 15
function hidePL() {
  const tbodyRows = document.querySelectorAll('#stockTable tbody tr');
  tbodyRows.forEach(row => {
    const pl = row.children[2].textContent.trim();
    const plNumber = parseFloat(pl);
    if (!isNaN(plNumber) && plNumber < 15) {
      row.classList.toggle('hide-pl');
    }
  });
}

// hide companies with ROE below 15%
function hideROE() {
  const tbodyRows = document.querySelectorAll('#stockTable tbody tr');
  tbodyRows.forEach(row => {
    const roe = row.children[16].textContent.trim();
    const roeNumber = parseFloat(roe.replace('%', ''));
    if (!isNaN(roeNumber) && roeNumber < 15) {
      row.classList.toggle('hide-roe');
    }
  });
}

// hide companies with Dividend Yield below 4%
function hideDY() {
  const tbodyRows = document.querySelectorAll('#stockTable tbody tr');
  tbodyRows.forEach(row => {
    const dy = row.children[5].textContent.trim();
    const dyNumber = parseFloat(dy.replace('%', ''));
    if (!isNaN(dyNumber) && dyNumber < 4) {
      row.classList.toggle('hide-dy');
    }
  });
}

// hide companies with ROIC below 15
function hideROIC() {
  const tbodyRows = document.querySelectorAll('#stockTable tbody tr');
  tbodyRows.forEach(row => {
    const roic = row.children[15].textContent.trim();
    const roicNumber = parseFloat(roic);
    if (!isNaN(roicNumber) && roicNumber < 15) {
      row.classList.toggle('hide-roic');
    }
  });
}

// hide companies with Cresc. Rec. 5a below 10
function hideCresc() {
  const tbodyRows = document.querySelectorAll('#stockTable tbody tr');
  tbodyRows.forEach(row => {
    const cresc = row.children[20].textContent.trim();
    const crescNumber = parseFloat(cresc);
    if (!isNaN(crescNumber) && crescNumber < 10) {
      row.classList.toggle('hide-cresc');
    }
  });
}