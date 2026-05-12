import { Button, Box, Typography } from '@mui/material';
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
  const orderSum = useWatch({ control, name: 'orderSum' });

  return (
    <>
      {isLastStep && orderSum < 100 ? (
        <Box sx={{ mt: 4 }}>
          <Typography color="#ff9800">Minimum order amount is $100</Typography>
        </Box>
      ) : null}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        {!isFirstStep ? <Button onClick={onBack}>Back</Button> : null}
        {isLastStep ? (
          <Button
            variant="contained"
            onClick={onMakeOrder}
            disabled={orderSum < 100}
          >
            Place Order
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
    </>
  );
};
