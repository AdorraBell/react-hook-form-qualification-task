import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material'
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { FormDataType } from '../types'
import { useFormContext, Controller, useFormState } from 'react-hook-form'
import { paymentMethods } from '../const'
import { VALIDATION } from '../utils'

export const OrderInfoForm = () => {
  const { control } = useFormContext<FormDataType>()

  const { errors } = useFormState({
    control,
    name: ['deliveryDate', 'deliveryTime', 'paymentMethod', 'shippingMethod'],
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name="deliveryDate"
        control={control}
        rules={VALIDATION.deliveryDate}
        render={({ field }) => (
          <DatePicker
            {...field}
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
  )
}
