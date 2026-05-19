import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormDataType, productCardDataType } from '../../types';
import { formatDate, formatTime } from '../../utils';
import { ProductCard } from '../ProductCard';

interface ApproveOrderModalProps {
  closeModal: () => void;
  showModal: boolean;
  confirmOrder: () => void;
}

export const ApproveOrderModal = ({
  closeModal,
  showModal,
  confirmOrder,
}: ApproveOrderModalProps) => {
  const { control } = useFormContext<FormDataType>();
  const {
    name,
    email,
    phone,
    address,
    comment,
    deliveryDate,
    deliveryTime,
    paymentMethod,
    shippingMethod,
    products,
    orderSum,
  } = useWatch({
    control,
  });

  /* one required field from each step to prevent the modal from rendering
    on first mount before any data is filled in */
  if (!name || !deliveryDate || !products?.length) return null;

  return (
    <Dialog open={showModal} onClose={closeModal}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        Please review your details before submitting the order
        <IconButton onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 3 }}>
          <Typography>Customer name: {name}</Typography>
          <Typography>Email: {email}</Typography>
          <Typography>Phone number: {phone}</Typography>
          <Typography>Address: {address}</Typography>
          {comment && comment.length > 0 ? (
            <Typography>Comment: {comment}</Typography>
          ) : null}
          <Typography>Delivery date: {formatDate(deliveryDate)}</Typography>
          <Typography>Delivery time: {formatTime(deliveryTime)}</Typography>
          <Typography>Payment method: {paymentMethod}</Typography>
          <Typography>Shipping method: {shippingMethod}</Typography>
          <Box
            sx={{ mt: 3, mb: 3, bgcolor: '#f5f5f5', borderRadius: '4px', p: 2 }}
          >
            <Typography variant="h6">Your order:</Typography>
            {products?.map((item, index) => (
              <ProductCard
                key={`${item.name}-${index}`}
                data={item as productCardDataType}
              />
            ))}
          </Box>
          <Typography variant="h6">Order total: ${orderSum}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Button onClick={closeModal}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={confirmOrder}>
            Confirm order
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
