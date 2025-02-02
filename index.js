const express = require("express");
const cors = require("cors");
const stocks = require("./stocks"); // Importing the stocks data from stocks.js
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Endpoint 1: Sort stocks by pricing (low-to-high or high-to-low)
app.get("/stocks/sort/pricing", (req, res) => {
  const { pricing } = req.query;
  const sortedStocks = [...stocks].sort((a, b) => {
    if (pricing === 'high-to-low') {
      return b.price - a.price;
    } else {
      return a.price - b.price;
    }
  });
  res.json({ stocks: sortedStocks });
});

// Endpoint 2: Sort stocks by growth (low-to-high or high-to-low)
app.get("/stocks/sort/growth", (req, res) => {
  const { growth } = req.query;
  const sortedStocks = [...stocks].sort((a, b) => {
    if (growth === 'high-to-low') {
      return b.growth - a.growth;
    } else {
      return a.growth - b.growth;
    }
  });
  res.json({ stocks: sortedStocks });
});

// Endpoint 3: Filter stocks by exchange (NSE or BSE)
app.get("/stocks/filter/exchange", (req, res) => {
  const { exchange } = req.query;
  const filteredStocks = stocks.filter(
    (stock) => stock.exchange.toLowerCase() === exchange.toLowerCase()
  );
  res.json({ stocks: filteredStocks });
});

// Endpoint 4: Filter stocks by industry sector (Finance, Pharma, Power)
app.get("/stocks/filter/industry", (req, res) => {
  const { industry } = req.query;
  const filteredStocks = stocks.filter(
    (stock) => stock.industry.toLowerCase() === industry.toLowerCase()
  );
  res.json({ stocks: filteredStocks });
});

// Endpoint 5: Get all available stocks
app.get("/stocks", (req, res) => {
  res.json({ stocks });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
