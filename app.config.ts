import { ConfigContext, ExpoConfig } from 'expo/config';

const VARIANT = process.env.APP_VARIANT;
const VERSION = '0.1.0';
const BUILD_NUMBER = 1;
const PROJECT_ID = '';
const APP_STORE_ID = 0;

export default ({ config: defaultConfig }: ConfigContext): ExpoConfig => {
  const config: ExpoConfig = {
    ...defaultConfig,
    name: 'Example',
    slug: 'example-app',
    owner: 'example-app',
    version: VERSION,
    orientation: 'default',
    icon: './src/assets/images/icon.png',
    scheme: 'example',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: { origin: false },
      eas: { projectId: PROJECT_ID },
    },
    updates: { url: `https://u.expo.dev/${PROJECT_ID}` },
    runtimeVersion: { policy: 'appVersion' },
    ios: {
      ...defaultConfig.ios,
      bundleIdentifier: 'com.example.app',
      supportsTablet: true,
      buildNumber: BUILD_NUMBER.toString(),
      // Add associatedDomains for Universal Links
      associatedDomains: ['applinks:app.example.com'],
      icon: './src/assets/images/icon-ios.icon',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        AppStoreID: APP_STORE_ID,
        AppStoreCountry: 'id',
      },
    },
    android: {
      ...defaultConfig.android,
      package: 'com.example.app',
      versionCode: BUILD_NUMBER,
      edgeToEdgeEnabled: true,
      // googleServicesFile:
      //   process.env.GOOGLE_SERVICES_JSON || './google-services.json',
      adaptiveIcon: {
        foregroundImage: './src/assets/images/icon-android.png',
        monochromeImage: './src/assets/images/icon-android-monochrome.png',
        backgroundColor: '#ffffff',
      },
      permissions: [],
      // Add intentFilters for App Links
      intentFilters: [],
    },
    plugins: [
      'expo-secure-store',
      [
        'expo-build-properties',
        {
          ios: {
            deploymentTarget: '15.5',
          },
          android: {
            minSdkVersion: 26,
          },
        },
      ],
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './src/assets/images/icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      'expo-font',
      [
        'expo-screen-orientation',
        {
          initialOrientation: 'PORTRAIT',
        },
      ],
      [
        'react-native-edge-to-edge',
        {
          android: {
            parentTheme: 'Default',
            enforceNavigationBarContrast: false,
          },
        },
      ],
      'expo-notifications',
    ],
  };

  if (VARIANT === 'development') {
    config.name = 'Example App Dev';
    config.ios!.bundleIdentifier = 'com.example.app.dev';
    config.ios!.icon = './src/assets/images/icon-ios-dev.icon';
    config.android!.package = 'com.example.app.dev';
    config.android!.adaptiveIcon!.foregroundImage =
      './src/assets/images/icon-android-dev.png';
  } else if (VARIANT === 'preview') {
    config.name = 'Example App Preview';
    config.ios!.bundleIdentifier = 'com.example.app.preview';
    config.android!.package = 'com.example.app.preview';
  }

  return config;
};
