import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FormDataType } from '../../types';
import { useCallback } from 'react';
import {
  useFormContext,
  Controller,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { paymentMethods } from '../../const';
import { useValidationRules } from '../../hooks';

export const OrderInfoForm = () => {
  const { control, trigger } = useFormContext<FormDataType>();
  const VALIDATION = useValidationRules();

  const { errors } = useFormState({
    control,
    name: ['deliveryDate', 'deliveryTime', 'paymentMethod', 'shippingMethod'],
  });

  const deliveryDate = useWatch({
    control,
    name: 'deliveryDate',
  });

  const isWeekend = deliveryDate
    ? [0, 6].includes(new Date(deliveryDate).getDay())
    : false;

  const shouldDisableDeliveryTime = useCallback(
    (time: Date, view: 'hours' | 'minutes' | 'seconds') => {
      if (!isWeekend) return false;

      const hour = time.getHours();

      if (view === 'hours') {
        return hour < 11 || hour >= 13;
      }

      return false;
    },
    [isWeekend],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name="deliveryDate"
        control={control}
        rules={VALIDATION.deliveryDate}
        render={({ field }) => (
          <DatePicker
            {...field}
            onChange={(date) => {
              field.onChange(date);
              trigger('deliveryTime');
            }}
            label="Delivery date"
            slotProps={{
              textField: {
                error: !!errors.deliveryDate,
                helperText: errors.deliveryDate?.message,
              },
            }}
          />
        )}
      />

      <Controller
        name="deliveryTime"
        control={control}
        rules={VALIDATION.deliveryTime}
        render={({ field }) => (
          <TimePicker
            {...field}
            label="Delivery time"
            ampm={false}
            minTime={new Date(0, 0, 0, 9, 0)}
            maxTime={new Date(0, 0, 0, 21, 0)}
            shouldDisableTime={shouldDisableDeliveryTime}
            slotProps={{
              textField: {
                error: !!errors.deliveryTime,
                helperText: errors.deliveryTime?.message,
              },
            }}
          />
        )}
      />
      <Controller
        name="paymentMethod"
        control={control}
        rules={VALIDATION.paymentMethod}
        render={({ field }) => (
          <FormControl error={!!errors.paymentMethod}>
            <InputLabel id="payment-method-label">Payment method</InputLabel>
            <Select
              {...field}
              labelId="payment-method-label"
              label="Payment method"
            >
              {paymentMethods.map(({ value, text }) => (
                <MenuItem key={value} value={value}>
                  {text}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.paymentMethod?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="shippingMethod"
        control={control}
        rules={VALIDATION.shippingMethod}
        render={({ field }) => (
          <FormControl error={!!errors.shippingMethod}>
            <InputLabel id="shipping-method-label">Delivery method</InputLabel>
            <Select
              {...field}
              labelId="shipping-method-label"
              label="Shipping method"
            >
              <MenuItem value="courier">Courier delivery</MenuItem>
              <MenuItem value="pickup">Store pickup</MenuItem>
              <MenuItem value="postal">Standard shipping</MenuItem>
            </Select>
            <FormHelperText>{errors.shippingMethod?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </LocalizationProvider>
  );
};
