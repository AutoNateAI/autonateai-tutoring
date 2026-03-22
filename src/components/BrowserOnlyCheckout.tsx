import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import SquareCheckoutCard from '@site/src/components/SquareCheckoutCard';
import type {ProductId} from '@site/src/data/products';

export default function BrowserOnlyCheckout({initialProductId}: {initialProductId?: ProductId}) {
  return (
    <BrowserOnly fallback={<div style={{color: '#cbd5e0'}}>Loading secure checkout...</div>}>
      {() => <SquareCheckoutCard initialProductId={initialProductId} />}
    </BrowserOnly>
  );
}
