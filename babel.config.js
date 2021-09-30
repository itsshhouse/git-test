module.exports = {
  presets: ['@vue/app'],
  overrides: [
    {
      test: './src/api/ApiService.ts',
      compact: false,
    },
  ],
};
