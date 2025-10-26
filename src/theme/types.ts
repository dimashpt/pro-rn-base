export interface Theme {
  colors: {
    // Brand colors
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;

    // Semantic colors
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    success: string;
    onSuccess: string;
    successContainer: string;
    onSuccessContainer: string;
    warning: string;
    onWarning: string;
    warningContainer: string;
    onWarningContainer: string;

    // Surface colors
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    surfaceDisabled: string;
    onSurfaceDisabled: string;

    // Outline colors
    outline: string;
    outlineVariant: string;

    // Other colors
    shadow: string;
    scrim: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    backdrop: string;

    // Elevation colors
    elevation: {
      level0: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
      level5: string;
    };

    // Brand palette (for advanced usage)
    primary50: string;
    primary100: string;
    primary200: string;
    primary300: string;
    primary400: string;
    primary500: string;
    primary600: string;
    primary700: string;
    primary800: string;
    primary900: string;
    primary950: string;

    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
    neutral900: string;

    success50: string;
    success100: string;
    success200: string;
    success300: string;
    success400: string;
    success500: string;
    success600: string;
    success700: string;
    success800: string;
    success900: string;

    warning50: string;
    warning100: string;
    warning200: string;
    warning300: string;
    warning400: string;
    warning500: string;
    warning600: string;
    warning700: string;
    warning800: string;
    warning900: string;

    danger50: string;
    danger100: string;
    danger200: string;
    danger300: string;
    danger400: string;
    danger500: string;
    danger600: string;
    danger700: string;
    danger800: string;
    danger900: string;
  };

  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
    '5xl': number;
    '6xl': number;
  };

  radius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    roundness: number;
  };

  typography: {
    fontFamily: {
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
    fontSize: {
      xs: number;
      sm: number;
      base: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
      '4xl': number;
      '5xl': number;
      '6xl': number;
    };
    lineHeight: {
      xs: number;
      sm: number;
      base: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
      '4xl': number;
      '5xl': number;
      '6xl': number;
    };
    fontWeight: {
      normal: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
    letterSpacing: {
      tight: number;
      normal: number;
      wide: number;
    };
    // Material Design typography scale
    displayLarge: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    displayMedium: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    displaySmall: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    headlineLarge: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    headlineMedium: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    headlineSmall: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    titleLarge: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    titleMedium: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    titleSmall: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    bodyLarge: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    bodyMedium: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    bodySmall: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    labelLarge: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    labelMedium: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
    labelSmall: {
      fontFamily: string;
      fontSize: number;
      fontWeight: string;
      letterSpacing: number;
      lineHeight: number;
    };
  };

  elevation: {
    level0: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    level1: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    level2: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    level3: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    level4: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    level5: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };

  opacity: {
    disabled: number;
    hover: number;
    focus: number;
    selected: number;
    pressed: number;
    dragged: number;
  };

  zIndex: {
    dropdown: number;
    sticky: number;
    fixed: number;
    modalBackdrop: number;
    modal: number;
    popover: number;
    skipLink: number;
    toast: number;
    tooltip: number;
  };
}
