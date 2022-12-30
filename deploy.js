/* deployment script
- compiles typescript to javascript
- copies other files, required to run but omitted by the compilator
- transpiles package.json
- pushes the code to deployment repo
** after successful run of the script
- import deployment repo on glitch
- remember to check environment variables if anything fails
*/

const { exec } = require("child_process");
const rmrf = require("rimraf");
const fs = require("fs-extra");
const util = require("util");
const execPromise = util.promisify(exec);

const dist = "./dist/";
const depRepo = "https://github.com/Oloqq/follify-deploy.git";

let success = true;

// reset dist state
rmrf.sync(dist);
fs.mkdirSync(dist);

function execHandler({error, stdout, stderr}) {
  success &= !error;
  if (error) {
    console.log(`[ERROR]: ${error.message}`);
  }
  if (stderr) {
    console.log(`[stderr]: ${stderr}`);
  }
  if (stdout) {
    console.log(`[stdout]: ${stdout}`);
  }
}

(async () => {
  // compile typescript
  let buildPromise = execPromise("npm run build");

  // views is not transferred by the build mechanism
  fs.mkdirSync(dist+"src/");
  fs.copySync("./src/views/", dist+"src/views/");

  // handle package.json
  (function transferPackageJson() {
    let original = JSON.parse(fs.readFileSync("./package.json").toString());
    let output = {
      name: original.name,
      version: original.version,
      description: original.description,
      main: original.main.replace(".ts", ".js"),
      scripts: {
        start: "node ./src/server.js"
        //TODO (?) test: "jest ..."
      },
      author: "Oloqq",
      license: "MIT",
      engines: {
        node: "14.17.3"
      },
      dependencies: original.dependencies
    }

    fs.writeFileSync(dist+"package.json", JSON.stringify(output));
  })();

  // make sure build has finished
  await buildPromise.then(execHandler)

  // push to deployment repo
  let commands = [
    "cd dist",
    "git init -b main",
    "git add .",
    `git commit -am "auto deploy"`,
    `git remote add origin ${depRepo}`,
    "git push --force origin main"
  ]
  let command = commands.join(" && ");
  console.log(`Executing: ${command}`);
  await (execPromise(command).then(execHandler));
  if (!success) {
    console.error("[ERROR] deployment failed");
  }
})();