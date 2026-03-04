const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;

const APP_VERSION = process.env.APP_VERSION || '1.0.0';

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: APP_VERSION });
});

app.post('/checkout', (req, res) => {
  res.set('X-App-Version', APP_VERSION);
  res.json({
    orderId: `ORD-${Date.now()}`,
    status: 'created',
    version: APP_VERSION,
  });
});

app.listen(PORT, () => {
  console.log(`Checkout v${APP_VERSION} listening on port ${PORT}`);
});
