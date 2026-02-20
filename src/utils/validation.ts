export const VALIDATION = {
  name: {
    required: 'Name is required',
    validate: (value: string | null | undefined) => {
      if (value && value.trim().length === 0) {
        return 'This field cannot contain only spaces'
      }
      if (value && value.trim().length < 2) {
        return 'Name must be at least 2 characters long'
      }
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid format',
    },
  },
  phone: {
    required: 'Phone number is required',
    pattern: {
      value: /^\+7\d{3}\d{3}\d{2}\d{2}$/i,
      message: 'Invalid format',
    },
  },
  address: {
    required: 'Address is required',
    validate: (value: string | null | undefined) => {
      if (value && value.trim().length === 0) {
        return 'This field cannot contain only spaces'
      }
      if (value && value.trim().length < 10) {
        return 'Minimum 10 characters'
      }
    },
  },
  deliveryDate: {
    required: 'Select a delivery date',
  },
  deliveryTime: {
    required: 'Select a delivery time',
  },
  paymentMethod: {
    required: 'Select a payment method',
  },
  shippingMethod: {
    required: 'Select a shipping method',
  },
}
