import { Box, Typography } from '@mui/material'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

const Tutorial = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#ECECEC',
        p: '5px 10px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
        Hướng dẫn:
      </Typography>
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 />
      <Typography
        sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'end' }}
      >
        Done!
      </Typography>
    </Box>
  )
}

export default Tutorial
