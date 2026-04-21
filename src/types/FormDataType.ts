export type clientInfoDataType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment?: string;
};

export type orderInfoDataType = {
  deliveryDate: Date | null;
  deliveryTime: Date | null;
  paymentMethod: 'card' | 'cash' | 'eWallet';
  shippingMethod: 'courier' | 'pickup' | 'postal';
};

export type productCardDataType = {
  name: string;
  priceForOne: number;
  description: string;
  category: string;
  count: number;
};

export type productsListDataType = {
  products: productCardDataType[] | null;
  draftProduct: productCardDataType;
  orderSum: number;
};

export type FormDataType = clientInfoDataType &
  orderInfoDataType &
  productsListDataType;
