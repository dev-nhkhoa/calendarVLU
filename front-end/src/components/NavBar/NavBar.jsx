import { Box, Button, Container, Typography } from '@mui/material'
import { version } from '../../../package.json'
import styled from '@emotion/styled'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

const NavBarButton = styled(Button)(({ theme }) => ({
  height: '25px',
  borderRadius: '16px',
  color: '#252525'
}))

const NavBar = () => {
  return (
    <Container
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { md: 'center', xs: 'space-between' },
        gap: 2,
        backgroundColor: '#fff',
        border: '2px solid black',
        borderRadius: '32px',
        py: '5px'
      }}>
      {/* Logo & version */}
      <Box sx={{ display: 'flex' }}>
        <Typography variant='normal'>calenVLU</Typography>
        <Typography variant='small'>{version}</Typography>
      </Box>
      <Box sx={{ display: { md: 'flex', xs: 'none' }, gap: 2 }}>
        <NavBarButton variant='text'>Home</NavBarButton>
        <NavBarButton variant='text'>Lịch Vlu Của Bạn</NavBarButton>
        <NavBarButton variant='text'>Liên Hệ Dev</NavBarButton>
      </Box>
      <Box sx={{ display: { md: 'none', xs: 'flex' } }}>
        <MenuRoundedIcon />
      </Box>
    </Container>
  )
}

export default NavBar
