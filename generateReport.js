const tslintHtmlReport = require('tslint-html-report');

config = {
  tslint: './tslint.json', // path to tslint.json
  srcFiles: 'src/**/*.ts', // files to lint
  outDir: 'logs/tslint-html-report', // output folder to write the report to
  html: 'tslint-report.html', // name of the html report generated
  exclude: ["./src/HttpStatusCode.ts"], // Files/patterns to exclude
  breakOnError: false, // Should it throw an error in tslint errors are found
  typeCheck: true, // enable type checking. requires tsconfig.json
  tsconfig: './tsconfig.json' // path to tsconfig.json
}

tslintHtmlReport(config, () => {
  console.log("e");
})