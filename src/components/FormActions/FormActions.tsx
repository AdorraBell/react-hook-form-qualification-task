import { Button, Box } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormDataType } from '../../types';

interface FormActionsProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onMakeOrder: () => void;
}

export const FormActions = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onMakeOrder,
}: FormActionsProps) => {
  const { control } = useFormContext<FormDataType>();
  const products = useWatch({ control, name: 'products' });
  const hasProducts = !!products?.length;

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
      {!isFirstStep ? <Button onClick={onBack}>Back</Button> : null}
      {isLastStep ? (
        <Button
          variant="contained"
          onClick={onMakeOrder}
          disabled={!hasProducts}
        >
          Make Order
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={onNext}
          sx={{ marginLeft: 'auto' }}
        >
          Next
        </Button>
      )}
    </Box>
  );
};
