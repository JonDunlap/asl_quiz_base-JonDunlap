module.exports = {
  extends: ['airbnb', 'react-app', 'prettier'],
  rules: {
    // turning off old rule of needing jsx in file names
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
  },
};
