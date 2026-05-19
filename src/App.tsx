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
const LOCAL_STORAGE_STEP_KEY = 'savedOrderFormStep';

export default function App() {
  const [savedSession] = useState<{
    formData: FormDataType | null;
    step: number;
  }>(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedStep = localStorage.getItem(LOCAL_STORAGE_STEP_KEY);
    if (!raw) return { formData: null, step: 0 };
    try {
      const parsed = JSON.parse(raw);
      return {
        formData: {
          ...parsed,
          deliveryDate: parsed.deliveryDate
            ? new Date(parsed.deliveryDate)
            : null,
          deliveryTime: parsed.deliveryTime
            ? new Date(parsed.deliveryTime)
            : null,
        },
        step: savedStep ? Number(savedStep) : 0,
      };
    } catch {
      return { formData: null, step: 0 };
    }
  });

  const [step, setStep] = useState(savedSession.step);

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showOrderCompletedState, setShowOrderCompletedState] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const form = useForm<FormDataType>({
    mode: 'onChange',
    defaultValues: savedSession.formData || DEFAULT_FORM_VALUES,
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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
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
    if (!valid) return;
    const nextStep = step + 1;
    const success = await handleFakeSaveData();
    if (success) {
      localStorage.setItem(LOCAL_STORAGE_STEP_KEY, String(nextStep));
      setStep(nextStep);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleMakeOrder = async () => {
    const success = await handleFakeSaveData();
    if (success) {
      localStorage.setItem(LOCAL_STORAGE_STEP_KEY, String(step));
      setShowApproveModal(true);
    }
  };

  const onSubmit = async () => {
    setShowLoader(true);
    const formData = getValues();
    /* fake request */
    const response = await sendData(formData, 1500);
    if (response.status === 200) {
      /* clear data */
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_STEP_KEY);
      reset(DEFAULT_FORM_VALUES);
      setStep(0);
      /* order completed state */
      setShowOrderCompletedState(true);
      setShowApproveModal(false);
    } else {
      setShowAlert(true);
    }
    setShowLoader(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentValues = getValues();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentValues));
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
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error" onClose={() => setShowAlert(false)}>
            Something went wrong. Please try again.
          </Alert>
        </Snackbar>
        <form noValidate>
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
