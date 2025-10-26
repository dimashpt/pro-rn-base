import { applicationId } from 'expo-application';

export const IS_PRODUCTION = applicationId === 'com.example.app' && !__DEV__;
