module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-react-compiler',
      'react-native-worklets/plugin',
      ['react-native-unistyles/plugin', { root: 'src' }],
    ],
  };
};
