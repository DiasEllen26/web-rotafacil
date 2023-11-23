import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background-secondary: #199B91;
    --background-secondary-dark: #1c2833;
    --white: #ffffff;
    --quite-gray: #555555;
    --background-secondary-light: #34495e;
    --primary: #3498db;
    --black: #000000;
    --transition-main: 0.68, -0.55, 0.27, 1.55;
    --font-main:  'Roboto', sans-serif;
  }

  body {
    font-family: var(--font-main);
    margin: 0;
    width: 100%;
    color: hsl(var(--text-primary));
    background-color: hsl(var(--background));
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
    box-sizing: border-box;
  }
`;