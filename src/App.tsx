import './App.css';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import { useState } from 'react';
import { DEFAULT_FORM_VALUES, fieldsByStep, STEPS_NAMES } from './const';
import { ClientInfoStep, OrderInfoStep, ProductsListStep } from './steps';

export default function App() {
  const [step, setStep] = useState(0);

  const form = useForm({
    mode: 'onChange',
    defaultValues: DEFAULT_FORM_VALUES,
    criteriaMode: 'all',
  });

  const { trigger } = form;

  const isLastStep = step === STEPS_NAMES.length - 1;
  const isFirstStep = step === 0;

  const handleNext = async () => {
    const fields = fieldsByStep[step];
    const valid = await trigger(fields);
    if (valid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <FormProvider {...form}>
      <Box sx={{ maxWidth: '1200px', width: '100%', mx: 'auto', my: 4, px: 4 }}>
        <form>
          <Stepper activeStep={step} alternativeLabel>
            {STEPS_NAMES.map((label: string) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 4 }}>
            {step === 0 && <ClientInfoStep />}
            {step === 1 && <OrderInfoStep />}
            {step === 2 && <ProductsListStep />}
          </Box>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            {!isFirstStep ? <Button onClick={handleBack}>Back</Button> : null}
            {isLastStep ? (
              <Button variant="contained">Make Order</Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ marginLeft: 'auto' }}
              >
                Next
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </FormProvider>
  );
}
