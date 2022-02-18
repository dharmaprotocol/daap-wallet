import EthereumIcon from "src/icons/EthereumMainnetIcon.svg";
import PolygonIcon from "src/icons/PolygonIcon.svg";
import { DefaultTheme } from "styled-components/macro";

export const DAPP_SCREENS = [
  "WHAT_YOU_WILL_NEED",
  "YOUR_WALLETS",
  "FOUND_WALLET",
  "WALLET"
];

export const infuraKey = "1c55b51e43354f4ab928f9bd314ed1fb";

const COLORS = {
  BLACK: "#000000",
  WHITE: "#FFFFFF",
  GREEN: "#0DD675",
  PALE_GREEN: "#F0FEF9",
  GRAY: "#B2B1AD",
  LIGHT_GRAY: "#D8D8D6",
  VERY_LIGHT_GRAY: "#F5F5F5",
  RED: "#FD5757",

  // Chains
  POLYGON_PURPLE: "#8F5AE8",

  // Discord
  ROYAL_BLUE: "#5869EA"
};

const SPACINGS = {
  NONE: "0",
  XSMALL: "7px",
  SMALL: "10px",
  MEDIUM: "15px",
  LARGE: "20px",
  XLARGE: "25px",
  XXLARGE: "40px",
  HERO: "80px",
  XXHERO: "160px"
};

const BORDER_RADII = {
  VERY_DULLED: "8px",
  DULLED: "12px",
  SHARP: "20px",
  NORMAL: "24px 24px 34px 34px",
  NORMAL_TOP: "24px",
  CIRCLE: "100px"
};

const BORDERS = {
  ACCENTED: `2px solid ${COLORS.GREEN};`,
  ERROR: `2px solid ${COLORS.RED};`,
  NORMAL: `2px solid ${COLORS.VERY_LIGHT_GRAY};`,
  INPUT: `2px solid ${COLORS.LIGHT_GRAY};`,
  SECONDARY: `1px solid ${COLORS.VERY_LIGHT_GRAY};`
};

const BOX_SHADOWS = {
  ERROR: "0px -4px 20px rgba(253, 87, 87, 0.3)",
  ACCENTED: "0px -4px 20px rgba(13, 214, 117, 0.3)",
  INPUT_GRAY: "0px 3px 15px 0px rgba(0, 0, 0, 0.15)",
  VERY_ACCENTED: "0px 4px 20px 0px rgba(35, 215, 128, 0.4)",
  ACCENTED_HOVERED: "0px -4px 20px rgba(13, 214, 117, 0.4)",
  SUBTLE_GRAY: "0px 5px 8px rgba(0, 0, 0, 0.1)",
  VERY_SUBTLE_GRAY: "0px 3px 15px rgba(0, 0, 0, 0.03)",
  GRAY: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  NONE: "none",

  // Discord
  ACCENTED_ROYAL_BLUE: "0px 4px 12px 0px rgba(88, 101, 242, 0.3)"
};

const FONT_FAMILY_STYLES = {
  CIRCULAR_BOOK: `
    font-family: CircularXXWeb-Book;
    letter-spacing: -.03em;
  `,
  CIRCULAR_MEDIUM: `
    font-family: CircularXXWeb-Medium;
    letter-spacing: -.03em;
  `,
  CIRCULAR_MONO: `
    font-family: CircularXXMonoWeb-Regular;
    letter-spacing: -.04em;
  `,
  GT_FLEXA_MEDIUM: `
    font-family: GT-Flexa-Standard-Medium;
    letter-spacing: -0.03em;
  `
};

const FONT_SIZES = {
  SMALL: "14px",
  SMEDIUM: "15px",
  MEDIUM: "16px",
  LARGE: "18px",
  XLARGE: "24px",
  XXL: "32px"
};

const LINEAR_GRADIENTS = {
  USD: "linear-gradient(80.83deg, #1E3882 7.77%, #3051AD 38.64%, #142B6B 85.16%)",
  POLYGON: "linear-gradient(277.4deg, #8F5AE8 17.74%, #763ADB 117.6%)",
  ETHEREUM: "linear-gradient(277.4deg, #627EEA 17.74%, #A7B6EF 117.6%)",
  LIGHT_TO_GRAY: "linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)",
  GRAY_TO_LIGHT: "linear-gradient(180deg, #F5F5F5 0%, #FFFFFF 100%)",
  ACCENTED_TO_LIGHT: "linear-gradient(#F0FEF9, #FFFFFF);",
  LIGHT_TO_ACCENTED: "linear-gradient(#FFFFFF, #F0FEF9);",

  // Discord
  ROYAL_BLUE: "linear-gradient(264.39deg, #5865F2 5.69%, #2937CD 91.05%)"
};

export const CHAIN_IDS = {
  ETHEREUM: 1337,
  POLYGON: 1337,
  Mainnet: 1337,
  Polygon: 1337,
} as const;

export const CONSTANTS = {
  LEGACY_BACKEND_API_URI: process.env.NEXT_PUBLIC_API_URI,
  MODERN_BACKEND_API_URI: process.env.NEXT_PUBLIC_MODERN_API_URI,
  BRANCH_KEY: "key_live_dgUUwR0s9JMCxaqUZA3YeoedxDfPsDQY",
  SEGMENT_API_KEY:
    process.env.NEXT_PUBLIC_SEGMENT_API_KEY ??
    "Y9D2vRnRqxpFYdxKA59jI2pJp9mzACMm",
  DHARMA_NAME: "Dharma",
  DHARMA_OS_NAME: "dharmaOS",
  CHAIN_IDS,
  SUPPORTED_CHAIN_IDS: Object.values(CHAIN_IDS),
  CAREERS_URL: "https://boards.greenhouse.io/dharma",
  TWITTER_URL: "https://twitter.com/dharma_hq",
  DISCORD_URL: "https://discord.gg/KuvmEke",
  COMMUNITY_URL: "/community",
  HELP_URL: "https://help.dharma.io",
  DHARMA_OS_URL: "https://github.com/dharmaprotocol/dharmaOS",
  SUPPORT_EMAIL_URL: "mailto:support@dharma.io",
  BLOG_URL: "https://dharma.mirror.xyz/",
  WHY_DO_I_NEED_DHARMA_WALLET_URL:
    "https://dharma6771.zendesk.com/hc/en-us/articles/4403836679323-Introduction-to-Dharma",
  WHAT_IS_A_NETWORK_URL:
    "https://dharma6771.zendesk.com/hc/en-us/articles/4406187811995-What-is-a-network-and-why-does-it-matter-",
  HOW_DEX_SAVE_YOU_MONEY_URL:
    "https://dharma6771.zendesk.com/hc/en-us/articles/4407531079579-How-decentralized-exchanges-save-you-money-by-cutting-out-the-middle-man",
  MAILCHIMP_URL:
    "//dharma.us15.list-manage.com/subscribe/post?u=b45a6a91dd9c5e7571fdfd3a1&amp;id=453645ba9f",
  CHAINS: {
    [CHAIN_IDS.POLYGON]: {
      ID: CHAIN_IDS.POLYGON,
      LINEAR_GRADIENT: LINEAR_GRADIENTS.POLYGON,
      BOX_SHADOW: "0px 4px 12px 0px #7D94EC4D",
      NETWORK_NAME: "Polygon",
      ICON: PolygonIcon,
      DESCRIPTION: "1,125 Tokens",
      USDC_ADDRESS: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      WETH_ADDRESS: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      SWAP_ACTION_SCRIPT_ID: parseInt(
        process.env.NEXT_PUBLIC_POLYGON_SWAP_ACTION_SCRIPT_ID ?? "49"
      ),
      NETWORK_FEES: false
    },
    [CHAIN_IDS.ETHEREUM]: {
      ID: CHAIN_IDS.ETHEREUM,
      LINEAR_GRADIENT: LINEAR_GRADIENTS.ETHEREUM,
      BOX_SHADOW: "0px 4px 12px 0px #7D94EC4D",
      NETWORK_NAME: "Ethereum",
      ICON: EthereumIcon,
      DESCRIPTION: "72,242 Tokens",
      USDC_ADDRESS: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      WETH_ADDRESS: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      SWAP_ACTION_SCRIPT_ID: parseInt(
        process.env.NEXT_PUBLIC_ETHEREUM_SWAP_ACTION_SCRIPT_ID ?? "48"
      ),
      NETWORK_FEES: true
    }
  },
  COLORS: {
    MAIN_BACKGROUND: COLORS.WHITE
  }
};

export const STYLES = {
  ASSET_ICON: {
    DEFAULT: {
      BACKGROUND: COLORS.GREEN,
      BORDER_RADIUS: BORDER_RADII.CIRCLE,
      BOX_SHADOW: BOX_SHADOWS.SUBTLE_GRAY,
      COLOR: COLORS.WHITE
    },
    LOADING: {
      BACKGROUND: COLORS.WHITE
    }
  },
  BORDERS,
  BOX_SHADOWS,
  BORDER_RADII,
  BUTTON: {
    DEFAULT: {
      FONT_FAMILY_STYLES: FONT_FAMILY_STYLES.CIRCULAR_MEDIUM,
      BORDER_RADIUS: BORDER_RADII.CIRCLE,
      PADDING_VERTICAL: SPACINGS.MEDIUM,
      PADDING_HORIZONTAL: SPACINGS.LARGE,
      FONT_SIZE: FONT_SIZES.LARGE
    },
    RECTANGLE: {
      BORDER_RADIUS: BORDER_RADII.VERY_DULLED
    },
    SIZE_SMALL: {
      PADDING: SPACINGS.MEDIUM,
      FONT_SIZE: FONT_SIZES.SMALL
    },
    SIZE_TINY: {
      PADDING: SPACINGS.XSMALL,
      FONT_SIZE: FONT_SIZES.SMALL
    }
  },
  CARD: {
    DEFAULT: {
      BACKGROUND: COLORS.WHITE,
      BOX_SHADOW: BOX_SHADOWS.GRAY,
      BORDER_RADIUS: BORDER_RADII.NORMAL,
      BORDER_RADIUS_TOP: BORDER_RADII.NORMAL_TOP
    },
    DEFAULT_NO_BUTTON: {
      BACKGROUND: COLORS.WHITE,
      BOX_SHADOW: BOX_SHADOWS.GRAY,
      BORDER_RADIUS: BORDER_RADII.NORMAL_TOP
    },
    FLAT: {
      BACKGROUND: COLORS.WHITE,
      BORDER_RADIUS: BORDER_RADII.NORMAL,
      BORDER: BORDERS.NORMAL
    },
    FLAT_NO_BUTTON: {
      BACKGROUND: COLORS.WHITE,
      BORDER_RADIUS: BORDER_RADII.NORMAL_TOP,
      BORDER: BORDERS.NORMAL
    },
    INNER_FLOATING: {
      BACKGROUND: COLORS.WHITE,
      BOX_SHADOW: BOX_SHADOWS.GRAY,
      BORDER_RADIUS: BORDER_RADII.DULLED
    },
    ACCENTED: {
      BOX_SHADOW: BOX_SHADOWS.ACCENTED
    },
    VERY_ACCENTED: {
      BOX_SHADOW: BOX_SHADOWS.VERY_ACCENTED
    }
  },
  CLOSE_BUTTON: {
    BACKGROUND: COLORS.GRAY,
    COLOR: COLORS.WHITE
  },
  COLORS,
  LINK: {
    COLOR: COLORS.GREEN,
    FONT_FAMILY_STYLES: FONT_FAMILY_STYLES.CIRCULAR_MEDIUM
  },
  NUMERICAL_INPUT: {
    COLOR: COLORS.BLACK,
    FONT_FAMILY_STYLES: FONT_FAMILY_STYLES.CIRCULAR_MONO,
    FONT_SIZE: FONT_SIZES.XXL,
    PLACEHOLDER_COLOR: COLORS.LIGHT_GRAY
  },
  RADIO_BUTTON: {
    COLOR: COLORS.BLACK,
    BACKGROUND: COLORS.WHITE,
    BORDER: `1px ${COLORS.BLACK} solid`
  },
  INPUT: {
    BORDER_RADIUS: BORDER_RADII.DULLED,
    PADDING: SPACINGS.SMALL,
    PLACEHOLDER_COLOR: COLORS.GRAY,
    DEFAULT: {
      BORDER: BORDERS.INPUT,
      BOX_SHADOW: BOX_SHADOWS.INPUT_GRAY
    },
    ACCENT: {
      BORDER: BORDERS.ACCENTED,
      BOX_SHADOW: BOX_SHADOWS.ACCENTED
    },
    VALID: {
      BORDER: BORDERS.ACCENTED,
      BOX_SHADOW: BOX_SHADOWS.ACCENTED
    },
    ERROR: {
      BORDER: BORDERS.ERROR,
      BOX_SHADOW: BOX_SHADOWS.ERROR
    }
  },
  TEXT: {
    FONT_SIZES: {
      STANDARD: FONT_SIZES.SMALL,
      SMEDIUM: FONT_SIZES.SMEDIUM
    },
    BOLD: {
      FONT_FAMILY: "CircularXXWeb-Medium"
    },
    DEFAULT: {
      FONT_FAMILY_STYLES: FONT_FAMILY_STYLES.CIRCULAR_BOOK
    },
    MONO: {
      FONT_FAMILY_STYLES: FONT_FAMILY_STYLES.CIRCULAR_MONO
    }
  },
  TITLE: {
    DEFAULT: {
      FONT_FAMILY_STYLES: FONT_FAMILY_STYLES.CIRCULAR_BOOK
    },
    MONO: {
      FONT_FAMILY_STYLES: FONT_FAMILY_STYLES.CIRCULAR_MONO
    },
    BOLD: {
      FONT_FAMILY: "CircularXXWeb-Medium"
    }
  },
  LINEAR_GRADIENTS,
  SPACINGS
};

export const defaultTheme: DefaultTheme = {
  breakpoints: {
    mobileMax: "539px",
    desktopMin: "540px"
  },
  button: {
    primary: {
      background: COLORS.GREEN,
      color: COLORS.WHITE,
      boxShadow: BOX_SHADOWS.ACCENTED,
      border: "none"
    },
    secondary: {
      background: COLORS.WHITE,
      color: COLORS.GREEN,
      boxShadow: "none",
      border: BORDERS.ACCENTED
    },
    light: {
      background: COLORS.WHITE,
      color: COLORS.BLACK,
      boxShadow: BOX_SHADOWS.GRAY,
      border: "none"
    },
    disabled: {
      background: COLORS.LIGHT_GRAY,
      color: COLORS.WHITE,
      boxShadow: BOX_SHADOWS.NONE,
      border: "none"
    }
  },
  input: {
    fontFamilyStyles: FONT_FAMILY_STYLES.CIRCULAR_MEDIUM
  },
  spacing: {
    none: SPACINGS.NONE,
    xsmall: SPACINGS.XSMALL,
    small: SPACINGS.SMALL,
    medium: SPACINGS.MEDIUM,
    large: SPACINGS.LARGE,
    xlarge: SPACINGS.XLARGE,
    xxlarge: SPACINGS.XXLARGE,
    hero: SPACINGS.HERO,
    xxhero: SPACINGS.XXHERO
  },
  linearGradient: {
    primaryToSecondary: LINEAR_GRADIENTS.LIGHT_TO_GRAY,
    secondaryToPrimary: LINEAR_GRADIENTS.GRAY_TO_LIGHT,
    primaryToAccented: LINEAR_GRADIENTS.LIGHT_TO_ACCENTED,
    accentedToPrimary: LINEAR_GRADIENTS.ACCENTED_TO_LIGHT,
    accentedPizzaz:
      "linear-gradient(111.09deg, rgba(115, 157, 255, 0.1) 27.83%, rgba(167, 103, 186, 0.1) 52.08%, rgba(241, 119, 134, 0.1) 71.39%)"
  },
  colors: {
    primaryBackground: COLORS.WHITE,
    secondaryBackground: COLORS.VERY_LIGHT_GRAY,
    accentedBackground: COLORS.PALE_GREEN
  },
  link: {
    primary: {
      color: COLORS.GREEN
    },
    secondary: {
      color: COLORS.GRAY
    }
  },
  mobileNavMenu: {
    backgroundColor: COLORS.WHITE
  },
  progressBar: {
    backgroundColor: STYLES.COLORS.VERY_LIGHT_GRAY,
    progressColor: STYLES.COLORS.GREEN
  },
  text: {
    fontFamilies: {
      regular: "CircularXXWeb-Book",
      bold: "CircularXXWeb-Medium"
    },
    standard: {
      desktop: {
        fontSize: "18px",
        letterSpacing: "-0.04em",
        lineHeight: "26px"
      },
      mobile: {
        fontSize: "14px",
        letterSpacing: "-0.03em",
        lineHeight: "20px"
      }
    },
    colors: {
      normal: COLORS.BLACK,
      secondary: COLORS.GRAY,
      accented: COLORS.GREEN,
      error: COLORS.RED,
      gain: COLORS.GREEN,
      loss: COLORS.RED
    }
  },
  title: {
    fontFamilies: {
      regular: "CircularXXWeb-Book",
      bold: "CircularXXWeb-Medium"
    },
    level1: {
      desktop: {
        fontSize: "54px",
        letterSpacing: "-0.04em",
        lineHeight: "72px"
      },
      mobile: {
        fontSize: "32px",
        letterSpacing: "-0.04em",
        lineHeight: "40px"
      }
    },
    level2: {
      desktop: {
        fontSize: "46px",
        letterSpacing: "-0.03em",
        lineHeight: "60px"
      },
      mobile: {
        fontSize: "24px",
        letterSpacing: "-0.04em",
        lineHeight: "32px"
      }
    },
    level3: {
      desktop: {
        fontSize: "32px",
        letterSpacing: "-0.04em",
        lineHeight: "40px"
      },
      mobile: {
        fontSize: "16px",
        letterSpacing: "-0.04em",
        lineHeight: "24px"
      }
    },
    level4: {
      desktop: {
        fontSize: "24px",
        letterSpacing: "-0.03em",
        lineHeight: "26px"
      },
      mobile: {
        fontSize: "20px",
        letterSpacing: "-0.03em",
        lineHeight: "26px"
      }
    },
    level5: {
      desktop: {
        fontSize: "18px",
        letterSpacing: "-0.03em",
        lineHeight: "28px"
      },
      mobile: {
        fontSize: "18px",
        letterSpacing: "-0.03em",
        lineHeight: "28px"
      }
    },
    level6: {
      desktop: {
        fontSize: "14px",
        letterSpacing: "-0.03em",
        lineHeight: "20px"
      },
      mobile: {
        fontSize: "14px",
        letterSpacing: "-0.03em",
        lineHeight: "20px"
      }
    }
  },
  landingPage: {
    cardWrapStyles: `
      padding-left: 10px;
      padding-right: 10px;
      max-width: 400px;
    `,
    sideBySideImageBackground: COLORS.PALE_GREEN
  },
  tooltip: {
    color: COLORS.GRAY
  }
};

export const discordTheme: DefaultTheme = {
  ...defaultTheme,
  button: {
    ...defaultTheme.button,
    primary: {
      ...defaultTheme.button.primary,
      background: LINEAR_GRADIENTS.ROYAL_BLUE,
      boxShadow: BOX_SHADOWS.ACCENTED_ROYAL_BLUE
    }
  },
  input: {
    fontFamilyStyles: FONT_FAMILY_STYLES.GT_FLEXA_MEDIUM
  },
  text: {
    ...defaultTheme.text,
    fontFamilies: {
      regular: "GT-Flexa-Standard-Regular",
      bold: "GT-Flexa-Standard-Medium"
    },
    standard: {
      desktop: {
        fontSize: "24px",
        letterSpacing: "-0.03em",
        lineHeight: "32px"
      },
      mobile: {
        fontSize: "18px",
        letterSpacing: "-0.03em",
        lineHeight: "24px"
      }
    },
    colors: {
      ...defaultTheme.text.colors,
      accented: COLORS.ROYAL_BLUE
    }
  },
  title: {
    ...defaultTheme.title,
    fontFamilies: {
      regular: "GT-Flexa-Standard-Regular",
      bold: "GT-Flexa-Standard-Medium"
    },
    level1: {
      desktop: {
        fontSize: "72px",
        letterSpacing: "-0.05em",
        lineHeight: "72px"
      },
      mobile: {
        fontSize: "48px",
        letterSpacing: "-0.05em",
        lineHeight: "52px"
      }
    },
    level2: {
      desktop: {
        fontSize: "54px",
        letterSpacing: "-0.05em",
        lineHeight: "54px"
      },
      mobile: {
        fontSize: "32px",
        letterSpacing: "-0.05em",
        lineHeight: "42px"
      }
    },
    level3: {
      desktop: {
        fontSize: "46px",
        letterSpacing: "-0.03em",
        lineHeight: "54px"
      },
      mobile: {
        fontSize: "24px",
        letterSpacing: "-0.03em",
        lineHeight: "28px"
      }
    },
    level4: {
      desktop: {
        fontSize: "32px",
        letterSpacing: "-0.03em",
        lineHeight: "44px"
      },
      mobile: {
        fontSize: "24px",
        letterSpacing: "-0.03em",
        lineHeight: "28px"
      }
    },
    level5: {
      desktop: {
        fontSize: "24px",
        letterSpacing: "-0.03em",
        lineHeight: "32px"
      },
      mobile: {
        fontSize: "20px",
        letterSpacing: "-0.03em",
        lineHeight: "28px"
      }
    },
    level6: {
      desktop: {
        fontSize: "20px",
        letterSpacing: "-0.03em",
        lineHeight: "32px"
      },
      mobile: {
        fontSize: "20px",
        letterSpacing: "-0.03em",
        lineHeight: "32px"
      }
    }
  }
};
