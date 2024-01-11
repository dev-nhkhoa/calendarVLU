import { Typography } from '@mui/material'

const InlineTypo = (props) => {
  const { name, css } = props
  return (
    <Typography sx={{ display: 'inline', fontWeight: 'bold', ...css }}>
      {name}
    </Typography>
  )
}

export default InlineTypo
