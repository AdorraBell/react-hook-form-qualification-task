import './App.css';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { useState, useCallback } from 'react';
import { DEFAULT_FORM_VALUES, fieldsByStep, STEPS_NAMES } from './const';
import { ClientInfoStep, OrderInfoStep, ProductsListStep } from './steps';
import { ApproveOrderModal, FormActions } from './components';
import { FormDataType } from './types';

export default function App() {
  const [step, setStep] = useState(0);
  const [showApproveModal, setShowApproveModal] = useState(false);

  const form = useForm<FormDataType>({
    mode: 'onChange',
    defaultValues: DEFAULT_FORM_VALUES,
    criteriaMode: 'all',
  });

  const { trigger, handleSubmit } = form;

  const isLastStep = step === STEPS_NAMES.length - 1;
  const isFirstStep = step === 0;

  const handleNext = useCallback(async () => {
    const fields = fieldsByStep[step];
    const valid = await trigger(fields);
    if (valid) {
      setStep((prev) => prev + 1);
    }
  }, [step, trigger]);

  const handleBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const handleMakeOrder = useCallback(() => {
    setShowApproveModal(true);
  }, []);

  const onSubmit = async () => {
    setShowApproveModal(false);
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
          <FormActions
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            onBack={handleBack}
            onNext={handleNext}
            onMakeOrder={handleMakeOrder}
          />
          <ApproveOrderModal
            showModal={showApproveModal}
            closeModal={() => setShowApproveModal(false)}
            confirmOrder={handleSubmit(onSubmit)}
          />
        </form>
      </Box>
    </FormProvider>
  );
}
