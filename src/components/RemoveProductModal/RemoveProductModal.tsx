import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

interface RemoveProductModalProps {
  closeModal: () => void;
  showModal: boolean;
  deleteApproved: () => void;
}

export const RemoveProductModal = ({
  closeModal,
  showModal,
  deleteApproved,
}: RemoveProductModalProps) => {
  return (
    <Dialog open={showModal} onClose={closeModal}>
      <DialogTitle>Delete item</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this item?</Typography>
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
          <Button onClick={deleteApproved} color="error" variant="contained">
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
