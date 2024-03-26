import { Box, Typography } from '@mui/material'
import { LANG } from '~/lib/language'

const TrobleshootAndQuestion = () => {
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
          troubleshoots & Questions:
        </Typography>
        {LANG.WnA.map((a) => (
          <ul key={a}>
            <li style={{ textIndent: '12px' }}>
              <Typography sx={{ fontWeight: '500', fontSize: '16px' }}>
                {a.Question}
              </Typography>
              <Typography
                sx={{ textIndent: '24px', fontSize: '14px', fontWeight: '300' }}
              >
                {a.Answer}
              </Typography>
            </li>
          </ul>
        ))}
      </Box>
    </Box>
  )
}

export default TrobleshootAndQuestion
