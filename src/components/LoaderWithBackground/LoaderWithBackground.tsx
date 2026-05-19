import { Box, Backdrop, CircularProgress } from '@mui/material';

export const LoaderWithBackground = () => {
  return (
    <Box sx={{ position: 'relative', minHeight: '200px' }}>
      <Backdrop
        open
        sx={{
          // without zIndex, input labels bleed through the blur
          zIndex: (theme) => theme.zIndex.modal + 1,
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
