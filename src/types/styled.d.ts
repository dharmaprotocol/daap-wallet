// import original module declarations
import "styled-components/macro";

// and extend them
declare module "styled-components/macro" {
  export interface TextTheme {
    desktop: {
      fontSize: string;
      letterSpacing: string;
      lineHeight: string;
    };
    mobile: {
      fontSize: string;
      letterSpacing: string;
      lineHeight: string;
    };
  }

  export interface DefaultTheme {
    breakpoints: {
      mobileMax: string;
      desktopMin: string;
    };
    button: {
      primary: {
        background: string;
        color: string;
        boxShadow: string;
        border: string;
      };
      secondary: {
        background: string;
        color: string;
        boxShadow: string;
        border: string;
      };
      light: {
        background: string;
        color: string;
        boxShadow: string;
        border: string;
      };
      disabled: {
        background: string;
        color: string;
        boxShadow: string;
        border: string;
      };
    };
    colors: {
      primaryBackground: string;
      secondaryBackground: string;
      accentedBackground: string;
    };
    input: {
      fontFamilyStyles: string;
    };
    spacing: {
      none: string;
      xsmall: string;
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      hero: string;
      xxhero: string;
    };
    linearGradient: {
      accentedPizzaz: string;
      primaryToSecondary: string;
      secondaryToPrimary: string;
      primaryToAccented: string;
      accentedToPrimary: string;
    };
    link: {
      primary: {
        color: string;
      };
      secondary: {
        color: string;
      };
    };
    mobileNavMenu: {
      backgroundColor: string;
    };
    progressBar: {
      backgroundColor: string;
      progressColor: string;
    };
    title: {
      fontFamilies: {
        regular: string;
        bold: string;
      };
      level1: TextTheme;
      level2: TextTheme;
      level3: TextTheme;
      level4: TextTheme;
      level5: TextTheme;
      level6: TextTheme;
    };
    text: {
      fontFamilies: {
        regular: string;
        bold: string;
      };
      standard: TextTheme;
      colors: {
        normal: string;
        secondary: string;
        accented: string;
        error: string;
        gain: string;
        loss: string;
      };
    };
    landingPage: {
      cardWrapStyles: string;
      sideBySideImageBackground: string;
    };
    tooltip: {
      color: string;
    };
  }
}
