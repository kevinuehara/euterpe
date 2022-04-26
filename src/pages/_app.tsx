import '../styles/globals.css'
import { GlobalStyle } from '../styles/GlobalStyle';

function MyApp({ Component, pageProps }) {
  return (<Component {...pageProps} >
      <GlobalStyle />
     </Component>);
}

export default MyApp
