const express = require('express');
const app = express();
const PORT = process.env.PORT || 3550;

const APP_VERSION = process.env.APP_VERSION || '1.0.0';

app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: APP_VERSION });
});

app.get('/products', (req, res) => {
  res.set('X-App-Version', APP_VERSION);
  res.json({
    products: [
      { id: '1', name: 'Widget A', price: 9.99 },
      { id: '2', name: 'Widget B', price: 14.99 },
    ],
    version: APP_VERSION,
  });
});

app.listen(PORT, () => {
  console.log(`ProductCatalog v${APP_VERSION} listening on port ${PORT}`);
});
