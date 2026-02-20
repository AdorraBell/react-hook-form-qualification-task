import { Stack, Typography } from '@mui/material'
import { OrderInfoForm } from '../components'

export const OrderInfoStep = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Order Info</Typography>
      <OrderInfoForm />
    </Stack>
  )
}
