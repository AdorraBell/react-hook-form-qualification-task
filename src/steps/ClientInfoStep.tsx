import { Stack, Typography } from '@mui/material'
import { ClientInfoForm } from '../components'

export const ClientInfoStep = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Personal Info</Typography>
      <ClientInfoForm />
    </Stack>
  )
}
