const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const VARIANT = process.env.VARIANT || 'stable';
const CANARY_WEIGHT = parseInt(process.env.CANARY_WEIGHT || '5', 10);

const PRODUCTCATALOG_URL = process.env.PRODUCTCATALOG_URL || 'http://productcatalog:3550';
const CHECKOUT_URL = process.env.CHECKOUT_URL || 'http://checkout:5050';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/status', async (req, res) => {
  const services = {};
  try {
    const pcRes = await fetch(`${PRODUCTCATALOG_URL}/health`);
    services.productcatalog = pcRes.ok ? 'ok' : 'error';
  } catch {
    services.productcatalog = 'unreachable';
  }
  try {
    const coRes = await fetch(`${CHECKOUT_URL}/health`);
    services.checkout = coRes.ok ? 'ok' : 'error';
  } catch {
    services.checkout = 'unreachable';
  }

  res.json({
    version: APP_VERSION,
    variant: VARIANT,
    canaryWeight: CANARY_WEIGHT,
    stableWeight: 100 - CANARY_WEIGHT,
    services,
  });
});

app.get('/api/version', (req, res) => {
  res.set('X-App-Version', APP_VERSION);
  res.set('X-Variant', VARIANT);
  res.json({ version: APP_VERSION, variant: VARIANT });
});

app.listen(PORT, () => {
  console.log(`Frontend (${VARIANT}) v${APP_VERSION} listening on port ${PORT}`);
});
