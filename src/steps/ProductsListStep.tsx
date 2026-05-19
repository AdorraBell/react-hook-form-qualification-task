import { Stack, Typography } from '@mui/material';
import { ProductsListForm } from '../components';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormDataType } from '../types';

interface ProductsListStepProps {
  isApproveModalOpen: boolean;
}

export const ProductsListStep = ({
  isApproveModalOpen,
}: ProductsListStepProps) => {
  const { control } = useFormContext<FormDataType>();
  const orderSum = useWatch({ control, name: 'orderSum' });

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Products List</Typography>
      <ProductsListForm isApproveModalOpen={isApproveModalOpen} />
      {orderSum ? (
        <Typography variant="h6">Total: ${orderSum}</Typography>
      ) : null}
    </Stack>
  );
};
