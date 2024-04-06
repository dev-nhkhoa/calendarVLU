import { Box, Typography } from '@mui/material'
import LandingPageHeader from '~/components/LandingPageHeader'
import { LANG } from '~/lib/language'

const Features = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <LandingPageHeader name='Tính năng:' />
      <Box sx={{ pl: '32px' }}>
        {LANG.tinhNang.map((tinhNang) => (
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
