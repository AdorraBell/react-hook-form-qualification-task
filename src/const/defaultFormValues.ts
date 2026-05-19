import { FormDataType } from '../types';

export const DEFAULT_FORM_VALUES: Partial<FormDataType> = {
  name: '',
  email: '',
  phone: '',
  address: '',
  comment: '',
  deliveryDate: null,
  deliveryTime: null,
  paymentMethod: 'cash',
  shippingMethod: 'pickup',
  products: [],
  draftProduct: {
    name: '',
    priceForOne: 1,
    description: '',
    category: '',
    count: 1,
  },
  orderSum: 0,
};
