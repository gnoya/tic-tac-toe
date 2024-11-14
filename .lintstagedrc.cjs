module.exports = {
  '*': 'npx prettier --ignore-unknown --write',
  '*.{js,jsx,ts,tsx}': 'npx eslint --report-unused-disable-directives',
  '*.ts?(x)': () => 'npx tsc -p tsconfig.json --noEmit',
}
