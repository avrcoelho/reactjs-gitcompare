import { createGlobalStyle } from 'styled-components';

import 'font-awesome/css/font-awesome.css';

/* estilos globais que funcionam em toda a aplicação
 se não for assim o estilo só funciona no componente que ele esta seno utilizado */
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #9b65e6;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family: Arial, Helvetica, sans-serif;
    }
`;

export default GlobalStyle;
