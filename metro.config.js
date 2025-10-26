const { withRozenite } = require('@rozenite/metro');
const { getDefaultConfig } = require('@expo/metro-config');
const { withRozeniteExpoAtlasPlugin } = require('@rozenite/expo-atlas-plugin');

const config = getDefaultConfig(__dirname);

/** @type {import('expo/metro-config').MetroConfig} */
const finalConfig = {
  ...config,
  transformer: {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
  resolver: {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
    // Ensure `.svg` is not inserted in a way that overrides `.android.js`
    sourceExts: [...new Set([...config.resolver.sourceExts, 'svg'])],
  },
};

module.exports = withRozenite(withRozeniteExpoAtlasPlugin(finalConfig), {
  enabled: process.env.WITH_ROZENITE === 'true',
});
