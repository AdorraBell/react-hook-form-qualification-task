import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import { FormDataType } from '../types';
import { VALIDATION } from '../utils';

export const ClientInfoForm = () => {
  const { register, control } = useFormContext<FormDataType>();
  const { errors } = useFormState({
    control,
    name: ['name', 'email', 'phone', 'address'],
  });

  const comment = useWatch({ control, name: 'comment' });

  return (
    <>
      <TextField
        label="Name *"
        placeholder="Name"
        fullWidth
        variant="outlined"
        {...register('name', VALIDATION.name)}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Email *"
        placeholder="Email"
        fullWidth
        variant="outlined"
        {...register('email', VALIDATION.email)}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Phone number *"
        placeholder="+7 XXX XXX XX XX"
        fullWidth
        variant="outlined"
        {...register('phone', VALIDATION.phone)}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />

      <TextField
        label="Delivery address *"
        placeholder="Your address"
        multiline
        rows={3}
        fullWidth
        variant="outlined"
        {...register('address', VALIDATION.address)}
        error={!!errors.address}
        helperText={errors.address?.message}
      />

      <TextField
        label="Comment"
        placeholder="Enter a message"
        multiline
        rows={3}
        fullWidth
        variant="outlined"
        inputProps={{ maxLength: 500 }}
        {...register('comment')}
      />

      {/* Use this instead of an error because it's not a validation error:
          the form must still be submittable. It's only a UI hint explaining why
          the user can't type more characters. */}
      {comment?.length === 500 ? (
        <Typography color="#ff9800">
          Maximum comment length is 500 characters
        </Typography>
      ) : null}
    </>
  );
};
