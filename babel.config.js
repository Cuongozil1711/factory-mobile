module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    ['react-native-reanimated/plugin'],
    ['@babel/plugin-proposal-optional-chaining'],
    [
      'module-resolver',
      {
        alias: {
          appNetworking: './src/library/networking',
          appConfig: './src/config',
          appStorage: './src/until',
          appCommon: './src/config',
        },
        root: ['./src'],
      },
    ],
  ],
};
