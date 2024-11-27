import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
  }

  h1 {
    color: #333;
    font-size: 24px;
    text-align: center;
  }
`;

export default GlobalStyle;
