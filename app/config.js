export default {
  color: '#4B32C3',
  parser: 'espree',
  parserOptions: {
    ecmaVersion: 5,
    sourceType: 'script',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false,
    },
  },
  ecmaVersions: [
    {key: "3", label: 3},
    {key: "5", label: '5 (default)'},
    {key: "6", label: '6 (2015)'},
    {key: "7", label: '7 (2016)'},
    {key: "8", label: '8 (2017)'},
  ],
  ecmaVersionDefault: 5,
  parsers: [
    {label: 'Espree (default)', key: 'espree'},
    {label: 'Esprima', key: 'esprima'},
    {label: 'Babel', key: 'babel-eslint'},
  ],
  parserDefault: 'espree',
};
