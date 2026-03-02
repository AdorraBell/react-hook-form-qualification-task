import { Stack, Typography } from '@mui/material';
import { ProductsListForm } from '../components';

export const ProductsListStep = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Products List</Typography>
      <ProductsListForm />
    </Stack>
  );
};
