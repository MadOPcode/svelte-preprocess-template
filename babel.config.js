module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: "60",
          ie: "11"
        }
      }
    ]
  ],
  plugins: ['@babel/plugin-proposal-unicode-property-regex']
};
