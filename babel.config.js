module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@src/components': './src/components',
          '@src/api': './src/api',
          '@src/contexts': './src/contexts',
          '@src/types': './src/types',
          '@src/hooks': './src/hooks',
          '@src/screens': './src/screens',
          '@src/utils': './src/utils',
          '@src/theme': './src/theme',
          '@src/navigation': './src/navigation',
        },
      },
    ],
  ],
};
