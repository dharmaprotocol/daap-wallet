import Wallet from "./pages/index";
import React from "react";
import { defaultTheme } from "src/constants";
import { ThemeProvider, createGlobalStyle } from "styled-components/macro";
import {DappNavLayout} from "./components/layouts/DappNavLayout";

const GlobalStyle = createGlobalStyle`
  body,
  #__next {
    width: 100%;
    height: 100%;
  }

  // Necessary to not have scroll bar space disappear when locking modals from scrolling
  body {
    overflow-y: scroll;
  }

  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  // CSS Reset

  * {
    box-sizing: border-box;
  }

  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role='list'],
  ol[role='list'] {
    list-style: none;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: auto;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    line-height: 1.5;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* Disable blue highlight of button etc. clicks on mobile */
  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <div
          style={{
            backgroundColor: " red",
            height: "100%",
            width: "100%",
            position: "absolute"
          }}
        >
            <DappNavLayout>
                <Wallet />
            </DappNavLayout>
        </div>
      </ThemeProvider>
    </>
  );
}
export default App;
