import '../styles/globals.css'
import { GlobalStyle } from '../styles/GlobalStyle';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE
}


function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
  <Component {...pageProps} >
      <GlobalStyle />
     </Component>
     </AlertProvider>);
}

export default MyApp
