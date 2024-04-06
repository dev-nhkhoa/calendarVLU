import { tinhNang } from '~/user-config.json'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import LandingPageHeader from '~/components/LandingPageHeader'

const Features = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <LandingPageHeader name='Tính năng:' />
      <Box sx={{ pl: '32px' }}>
        {tinhNang.map((tinhNang) => (
          <ul
            key={tinhNang.name}
            style={{
              color: tinhNang.done ? '#333333' : '#fff',
              fontSize: '16px',
              textDecoration: tinhNang.done ? 'line-through' : 'none'
            }}>
            <li>
              <Typography>
                {tinhNang.name} - V{tinhNang.atVersion}{' '}
                {tinhNang.done ? '' : ' - Đang phát triển'}
              </Typography>
            </li>
          </ul>
        ))}
      </Box>
    </Box>
  )
}

export default Features
