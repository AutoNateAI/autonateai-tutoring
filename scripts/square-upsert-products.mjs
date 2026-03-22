const accessToken = process.env.SQUARE_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error('SQUARE_ACCESS_TOKEN is required');
}

const environment = process.env.SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox';
const origin =
  environment === 'production'
    ? 'https://connect.squareup.com'
    : 'https://connect.squareupsandbox.com';

const products = [
  {
    id: 'ai-first-student',
    name: 'AI-First Student',
    amount: 12900,
  },
  {
    id: 'ai-first-researcher',
    name: 'AI-First Researcher',
    amount: 18900,
  },
];

for (const product of products) {
  const idempotencyKey = `${product.id}-${Date.now()}`;
  const payload = {
    idempotency_key: idempotencyKey,
    object: {
      type: 'ITEM',
      id: `#${product.id}`,
      item_data: {
        name: product.name,
        product_type: 'REGULAR',
        description: `${product.name} premium async digital course`,
        variations: [
          {
            type: 'ITEM_VARIATION',
            id: `#${product.id}-variation`,
            item_variation_data: {
              name: 'Default',
              pricing_type: 'FIXED_PRICING',
              price_money: {
                amount: product.amount,
                currency: 'USD',
              },
            },
          },
        ],
      },
    },
  };

  const response = await fetch(`${origin}/v2/catalog/object`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Square-Version': process.env.SQUARE_VERSION ?? '2026-03-18',
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(`${product.name}: ${json.errors?.[0]?.detail ?? 'Square catalog request failed.'}`);
  }

  console.log(`${product.name}: ${json.catalog_object?.id ?? 'created'}`);
}
