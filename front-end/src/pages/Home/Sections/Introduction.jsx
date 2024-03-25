import { Box, Typography } from '@mui/material'
import { LANG } from '~/lib/language'

const listTINHNANG = (name, version) => {
  return (
    <Typography
      sx={{ fontSize: '16px', fontWeight: '400', textIndent: '12px' }}
    >
      {name}: {version}
    </Typography>
  )
}

const Introduction = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#ECECEC',
          p: '5px 10px',
          borderRadius: '16px'
        }}
      >
        <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
          Đây là gì?
        </Typography>
        <Typography
          sx={{ fontSize: '16px', fontWeight: '400', textIndent: '12px' }}
        >
          {LANG.introduce}
        </Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
          Tính năng:
        </Typography>
        <ul>
          {LANG.tinhNang.map((TINHNANG) => (
            <li key={TINHNANG.key}>
              {TINHNANG.name} (Version: {TINHNANG.atVersion})
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  )
}

export default Introduction
