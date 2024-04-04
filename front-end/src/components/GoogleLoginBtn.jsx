import { Button } from '@mui/material'
import { LANG } from '~/lib/language'

const GoogleLoginBtn = () => {
  return (
    <Button
      variant='contained'
      onClick={() => {
        window.open(`${LANG.link}/google/authenticate`, '_self')
      }}
    >
      Đăng nhập Google
    </Button>
  )
}

export default GoogleLoginBtn
