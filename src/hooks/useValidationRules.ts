import { useFormContext } from 'react-hook-form';
import { getExactDaysDiff, checkEmailAvailability } from '../utils';

/* Hook instead of a constant so we can call form context for cross-field validation:
   if the selected date is Saturday or Sunday, delivery time is restricted to 11:00–13:00 */
export const useValidationRules = () => {
  const { getValues } = useFormContext();

  return {
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
      validate: async (value: string) => {
        /* pattern rule handles format errors, skip the async check for invalid formats 
      (validate and pattern work at the same time, neither waits for the other) */
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          return true;
        const isAvailable = await checkEmailAvailability(value);
        return isAvailable || 'This email is already taken';
      },
    },
    phone: {
      required: 'Please enter your phone number',
      pattern: {
        value: /^\+1\d{3}\d{3}\d{2}\d{2}$/i,
        message: 'Please enter a valid phone number (e.g. +10005550100)',
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
      validate: (value: Date | null) => {
        const today = new Date();

        if (!value) return 'Please select a date';

        if (getExactDaysDiff(today, value) <= 0) {
          return 'Date must be at least tomorrow';
        }
      },
    },
    deliveryTime: {
      required: 'Please select a delivery time',
      validate: (value: Date | null) => {
        if (!value) return 'Please select a time';
        const hour = value.getHours();
        const date = getValues('deliveryDate');
        if (!date) return 'Please select a delivery date first';
        /* 0 is Sunday, 6 is Saturday */
        const day = new Date(date).getDay();
        /* weekend — 13:00 exactly is valid, matching the message */
        if (day === 0 || day === 6) {
          const minutes = value.getMinutes();
          return (
            (hour >= 11 && (hour < 13 || (hour === 13 && minutes === 0))) ||
            'Weekend delivery is only available from 11:00 to 13:00'
          );
        }
        /* weekday — 21:00 exactly is valid, matching the picker's maxTime */
        const minutes = value.getMinutes();
        return (
          (hour >= 9 && (hour < 21 || (hour === 21 && minutes === 0))) ||
          'Delivery time must be between 09:00 and 21:00'
        );
      },
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
      valueAsNumber: true,
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
      valueAsNumber: true,
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
};
