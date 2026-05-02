import { Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface OrderSuccessfullyCompletedProps {
  clickMakeNewOrder: () => void;
}

export const OrderSuccessfullyCompleted = ({
  clickMakeNewOrder,
}: OrderSuccessfullyCompletedProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      px={2}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'green', mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Order successfully placed!
      </Typography>
      <Typography variant="body1" mb={4}>
        We'll be in touch shortly.
      </Typography>
      <Button variant="contained" color="primary" onClick={clickMakeNewOrder}>
        Place a new order
      </Button>
    </Box>
  );
};
