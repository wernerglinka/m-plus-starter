// Used only for .njk (Nunjucks/Jinja) templates via prettier-plugin-jinja-template.
// All JS/JSON/CSS formatting is handled by Biome (biome.json).
export default {
  plugins: ['prettier-plugin-jinja-template'],
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  semi: true,
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  overrides: [
    {
      files: '*.njk',
      options: {
        parser: 'jinja-template',
        htmlWhitespaceSensitivity: 'css'
      }
    }
  ]
};
