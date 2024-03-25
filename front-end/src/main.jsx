import ReactDOM from 'react-dom/client'
import Home from './pages/Home/Home'
import { experimental_extendTheme as extendTheme } from '@mui/material'
import { Experimental_CssVarsProvider as MuiProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fontsource/inter'
import { CssBaseline } from '@mui/material'

const theme = extendTheme({
  typography: {
    title: {
      fontSize: 20
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
  <RouterProvider router={router}>
    <CssBaseline />
    <MuiProvider theme={theme} />
  </RouterProvider>
)
