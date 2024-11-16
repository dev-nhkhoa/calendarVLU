import { Box, Button, Container, Fade, Menu, MenuItem, Typography } from '@mui/material'
import { version } from '../../../package.json'
import styled from '@emotion/styled'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const NavBarButton = styled(Button)(() => ({
  height: '25px',
  borderRadius: '16px',
  color: '#252525'
}))

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const navigate = useNavigate()
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
      }}
    >
      {/* Logo & version */}
      <Box sx={{ display: 'flex' }}>
        <Typography variant="normal">calenVLU</Typography>
        <Typography variant="small">{version}</Typography>
      </Box>
      <Box sx={{ display: { md: 'flex', xs: 'none' }, gap: 2 }}>
        <NavBarButton variant="text" onClick={() => navigate('/')}>
          Home
        </NavBarButton>
        <NavBarButton variant="text" onClick={() => navigate('/vlu/login')}>
          Lịch
        </NavBarButton>
        <NavBarButton variant="text" onClick={() => navigate('/contact')}>
          Liên Hệ
        </NavBarButton>
      </Box>
      <Box sx={{ display: { md: 'none', xs: 'flex' } }}>
        <Button
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{ color: '#252525' }}
          onClick={handleClick}
        >
          <MenuRoundedIcon />
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button'
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={() => {
              navigate('/')
              setAnchorEl(null)
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/vlu/login')
              setAnchorEl(null)
            }}
          >
            Lịch Vlu của bạn
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/contact')
              setAnchorEl(null)
            }}
          >
            Liên hệ Dev
          </MenuItem>
        </Menu>
      </Box>
    </Container>
  )
}

export default NavBar
