import ReactDOM from 'react-dom/client'
import Home from './pages/HomeV2/Home'
import { experimental_extendTheme as extendTheme } from '@mui/material'
import { Experimental_CssVarsProvider as MuiProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fontsource/inter'
import { CssBaseline } from '@mui/material'

export const colors = {
  main: '#fff',
  bg: '#000'
}

const theme = extendTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: 'roboto',
        variantMapping: {
          large: 'h3',
          normal: 'h2',
          small: 'h1'
        }
      }
    }
  },
  typography: {
    large: {
      fontSize: '26px',
      fontWeight: '800'
    },
    normal: {
      fontSize: '20px',
      fontWeight: '500'
    },
    small: {
      fontSize: '14px',
      fontWeight: '100'
    }
  },
  colorSchemes: {
    light: {},
    dark: {}
  }
})

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Home />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <MuiProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </MuiProvider>
)
