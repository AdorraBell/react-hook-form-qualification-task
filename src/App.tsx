import './App.css';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Stepper, Step, StepLabel, Snackbar, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { DEFAULT_FORM_VALUES, fieldsByStep, STEPS_NAMES } from './const';
import { ClientInfoStep, OrderInfoStep, ProductsListStep } from './steps';
import {
  ApproveOrderModal,
  FormActions,
  LoaderWithBackground,
  OrderSuccessfullyCompleted,
} from './components';
import { FormDataType } from './types';
import { sendData } from './utils';

const LOCAL_STORAGE_KEY = 'savedOrderForm';

export default function App() {
  const [step, setStep] = useState(0);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showOrderCompletedState, setShowOrderCompletedState] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [parsedFormData] = useState<FormDataType | null>(() => {
    const savedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!savedFormData) {
      return null;
    }
    try {
      const parsed = JSON.parse(savedFormData);
      return {
        ...parsed,
        deliveryDate: parsed.deliveryDate
          ? new Date(parsed.deliveryDate)
          : null,
        deliveryTime: parsed.deliveryTime
          ? new Date(parsed.deliveryTime)
          : null,
      };
    } catch {
      return null;
    }
  });

  const form = useForm<FormDataType>({
    mode: 'onChange',
    defaultValues: parsedFormData || DEFAULT_FORM_VALUES,
    criteriaMode: 'all',
  });

  const { trigger, handleSubmit, getValues, reset } = form;

  const isLastStep = step === STEPS_NAMES.length - 1;
  const isFirstStep = step === 0;

  const handleFakeSaveData = async () => {
    setShowLoader(true);
    const formData = getValues();
    /* fake request */
    const response = await sendData(formData, 1500);
    setShowLoader(false);
    if (response.status === 200) {
      /* save values to localStorage on step change */
      const currentValues = getValues();
      const asString = JSON.stringify(currentValues);
      localStorage.setItem(LOCAL_STORAGE_KEY, asString);
      /* can't go past step 3 */
      if (step !== 2) setStep((prev) => prev + 1);
      return true;
    }
    setShowAlert(true);
    return false;
  };

  const handleNext = async () => {
    const fields = fieldsByStep[step];
    /* await is needed because we wait for trigger results —
    it returns a promise and without await it will always be true */
    const valid = await trigger(fields);
    if (valid) {
      await handleFakeSaveData();
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleMakeOrder = async () => {
    const success = await handleFakeSaveData();
    if (success) setShowApproveModal(true);
  };

  const onSubmit = async () => {
    setShowApproveModal(false);
    setShowLoader(true);
    const formData = getValues();
    /* fake request */
    const response = await sendData(formData, 1500);
    if (response.status === 200) {
      /* clear data */
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      reset(DEFAULT_FORM_VALUES);
      setStep(0);
      /* order completed state */
      setShowOrderCompletedState(true);
    } else {
      setShowAlert(true);
    }
    setShowLoader(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentValues = getValues();
      const asString = JSON.stringify(currentValues);
      localStorage.setItem(LOCAL_STORAGE_KEY, asString);
    }, 30000);

    return () => clearInterval(interval);
  }, [getValues]);

  if (showOrderCompletedState)
    return (
      <OrderSuccessfullyCompleted
        clickMakeNewOrder={() => setShowOrderCompletedState(false)}
      />
    );

  return (
    <FormProvider {...form}>
      <Box sx={{ maxWidth: '1200px', width: '100%', mx: 'auto', my: 4, px: 4 }}>
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
        >
          <Alert severity="error" onClose={() => setShowAlert(false)}>
            Something went wrong. Please try again.
          </Alert>
        </Snackbar>
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
            {step === 2 && (
              <ProductsListStep isApproveModalOpen={showApproveModal} />
            )}
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
        {showLoader ? <LoaderWithBackground /> : null}
      </Box>
    </FormProvider>
  );
}
