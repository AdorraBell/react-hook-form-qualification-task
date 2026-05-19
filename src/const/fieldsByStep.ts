/* Only steps 0 and 1 go through handleNext, which uses this list to trigger
   per-step validation. Step 2 (products) is submitted via handleMakeOrder
   and validated separately via handleSaveDraft per product. */
export const fieldsByStep = [
  ['name', 'email', 'phone', 'address', 'comment'],
  ['deliveryDate', 'deliveryTime', 'paymentMethod', 'shippingMethod'],
] as const;
