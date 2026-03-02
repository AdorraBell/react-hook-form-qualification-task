export const VALIDATION = {
  name: {
    required: 'Please enter your name',
    validate: (value: string | null | undefined) => {
      if (value && value.trim().length === 0) {
        return 'Name cannot contain only spaces';
      }
      if (value && value.trim().length < 2) {
        return 'Name must be at least 2 characters long';
      }
    },
  },
  email: {
    required: 'Please enter your email address',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address',
    },
  },
  phone: {
    required: 'Please enter your phone number',
    pattern: {
      value: /^\+7\d{3}\d{3}\d{2}\d{2}$/i,
      message: 'Please enter a valid phone number',
    },
  },
  address: {
    required: 'Please enter your address',
    validate: (value: string | null | undefined) => {
      if (value && value.trim().length === 0) {
        return 'Address cannot contain only spaces';
      }
      if (value && value.trim().length < 10) {
        return 'Address must be at least 10 characters long';
      }
    },
  },
  deliveryDate: {
    required: 'Please select a delivery date',
  },
  deliveryTime: {
    required: 'Please select a delivery time',
  },
  paymentMethod: {
    required: 'Please choose a payment method',
  },
  shippingMethod: {
    required: 'Please choose a shipping method',
  },
  productName: {
    required: 'Please enter a product name',
    validate: (value: string | null | undefined) => {
      if (value && value.trim().length === 0) {
        return 'Product name cannot contain only spaces';
      }
      if (value && value.trim().length < 3) {
        return 'Product name must be at least 3 characters long';
      }
    },
  },
  productCount: {
    required: 'Please enter a quantity',
    validate: (value: number) => {
      if (value < 0) return 'Quantity cannot be negative';

      /* Using validate instead of min/max so we can show
         a more specific message for negative values */
      if (value < 1) return 'Quantity must be at least 1';
      if (value > 99) return 'Quantity cannot exceed 99';
      return true;
    },
  },
  priceForOne: {
    required: 'Please enter a price',
    validate: (value: number) => {
      if (value < 0) return 'Price cannot be negative';

      /* Using validate instead of min/max so we can show
         a clearer message for zero values */
      if (value < 1) return 'Price must be greater than 0';
      return true;
    },
  },
  productCategory: {
    required: 'Please select a category',
  },
};
