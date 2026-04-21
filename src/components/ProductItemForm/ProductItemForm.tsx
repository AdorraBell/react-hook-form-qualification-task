import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Stack,
  Typography,
} from '@mui/material';
import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { FormDataType } from '../../types';
import { NEW_ITEM_PREFIX, productCategory } from '../../const';
import { VALIDATION } from '../../utils';

export const ProductItemForm = () => {
  const { control, register } = useFormContext<FormDataType>();
  const { errors } = useFormState({
    control,
    name: [
      `${NEW_ITEM_PREFIX}.name`,
      `${NEW_ITEM_PREFIX}.count`,
      `${NEW_ITEM_PREFIX}.priceForOne`,
      `${NEW_ITEM_PREFIX}.category`,
      `${NEW_ITEM_PREFIX}.description`,
    ],
  });

  const description = useWatch({
    control,
    name: `${NEW_ITEM_PREFIX}.description`,
  });

  return (
    <Stack spacing={3}>
      <TextField
        label="Product name *"
        {...register(`${NEW_ITEM_PREFIX}.name`, VALIDATION.productName)}
        error={!!errors?.[NEW_ITEM_PREFIX]?.name}
        helperText={errors?.[NEW_ITEM_PREFIX]?.name?.message}
        fullWidth
      />
      <TextField
        label="Quantity *"
        type="number"
        {...register(`${NEW_ITEM_PREFIX}.count`, VALIDATION.productCount)}
        error={!!errors?.[NEW_ITEM_PREFIX]?.count}
        helperText={errors?.[NEW_ITEM_PREFIX]?.count?.message}
        fullWidth
      />
      <TextField
        label="Price per unit *"
        type="number"
        {...register(`${NEW_ITEM_PREFIX}.priceForOne`, VALIDATION.priceForOne)}
        error={!!errors?.[NEW_ITEM_PREFIX]?.priceForOne}
        helperText={errors?.[NEW_ITEM_PREFIX]?.priceForOne?.message}
        fullWidth
      />
      <Controller
        name={`${NEW_ITEM_PREFIX}.category`}
        control={control}
        rules={VALIDATION.productCategory}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors?.[NEW_ITEM_PREFIX]?.category}>
            <InputLabel>Category</InputLabel>
            <Select {...field} label="Category">
              {productCategory.map(({ value, text }) => (
                <MenuItem key={value} value={value}>
                  {text}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors?.[NEW_ITEM_PREFIX]?.category?.message}
            </FormHelperText>
          </FormControl>
        )}
      />
      <TextField
        label="Notes"
        multiline
        rows={3}
        {...register(`${NEW_ITEM_PREFIX}.description`)}
        fullWidth
        inputProps={{ maxLength: 200 }}
      />
      {/* Use this instead of "error" because it is not actually an error.
          The form should not be blocked when 200 characters are entered —
          we just show a message so the user knows the limit is reached. */}
      {description?.length === 200 ? (
        <Typography color="#ff9800">
          Maximum comment length is 200 characters
        </Typography>
      ) : null}
    </Stack>
  );
};
