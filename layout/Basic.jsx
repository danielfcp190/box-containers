import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
	

`;

const BasicLayout = ({ children }) => {
  return (
    <>
      <GlobalStyle />

      {children}
    </>
  );
};

export default BasicLayout;
