import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NavigateIcon = ({ navigateTo }) => {
  const navigate = useNavigate()
  return (
    <Button
      variant='text'
      sx={{ color: '#eeeeee' }}
      onClick={() => navigate(navigateTo)}>
      <ArrowBackRoundedIcon />
    </Button>
  )
}

export default NavigateIcon
